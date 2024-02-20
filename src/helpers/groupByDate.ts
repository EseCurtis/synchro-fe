interface DataItem {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    reportableId: string;
    user: User;
    reportable: Reportable;
    action: string
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    profileImage: string;
    coverImage: string | null;
    bio: string | null;
    location: string | null;
    website: string | null;
    private: boolean;
    isBusiness: boolean;
    showActivity: boolean;
    showLocation: boolean;
    followingCount: number;
    followerCount: number;
    appType: string;
    userState: string;
    postCount: number;
    lastSeen: string | null;
}

interface Reportable extends User{}

interface Group {
    title: string;
    data: DataItem;
    trails: DataItem[];
    createdAt: number;
}

const groupByDate = (data: DataItem[]): Group[] => {
    // Convert 5 minutes to milliseconds
    const interval: number = 5 * 60 * 1000;

    // Sort the data by createdAt
    data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    // Group the data
    let groups: Group[] = [];
    let currentGroup: Group | null = null;
    for (let item of data) {
        let createdAt: number = new Date(item.createdAt).getTime();
        item.action = item.title.split(" ").slice(1, -1).join(" ");
        if (!currentGroup || createdAt - currentGroup.createdAt > interval) {
            currentGroup = {
                title: item.title,
                data: item,
                trails: [item],
                createdAt
            };
            groups.push(currentGroup);
        } else {
            currentGroup.trails.push(item);
        }
    }

    return groups;
}

export default groupByDate;
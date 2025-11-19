import { Audit, AuditGroup } from "@/v2/types/audits.types";

export const groupByDate = (data: Audit[]): AuditGroup[] => {
    if (!data || data.length < 1) return [];

    // 5-minute interval in milliseconds
    const interval = 5 * 60 * 1000;

    // Sort by createdAt (oldest to newest)
    data.sort(
        (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const groups: AuditGroup[] = [];
    let currentGroup: AuditGroup | null = null;

    for (const item of data) {
        const createdAt = new Date(item.createdAt).getTime();

        // Use meaningful values for title/grouping
        const title = `${item.performedByName} - ${item.actionDescription}`;

        // Start a new group if none exists or if the interval has passed
        if (!currentGroup || createdAt - currentGroup.createdAt > interval) {
            currentGroup = {
                title,
                data: item,
                trails: [item],
                createdAt,
            };
            groups.push(currentGroup);
        } else {
            currentGroup.trails.push(item);
        }
    }

    return groups;
};


export default groupByDate;
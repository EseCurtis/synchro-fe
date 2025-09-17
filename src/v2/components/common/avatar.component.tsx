import { UserData } from "@/v2/types/user.types";



export function UserAvatarV2({ user }: { user: UserData }) {
  const profile = user?.profiles?.[0];
  const randomColor = {
    bg: "#fac0003b",
    fg: "#fac000",
  };
  const initials = `${profile?.username.slice(0, 1)}`;

  return (
    <div className="aspect-square w-full h-full">
      {profile?.avatar ? (
        <img
          className="w-full h-full rounded-full object-cover"
          src={profile?.avatar}
          alt=""
        />
      ) : (
        <div
          style={{
            background: randomColor.bg,
            color: randomColor.fg,
          }}
          className="w-full h-full flex items-center justify-center rounded-full bg-gray-500"
        >
          <b>{initials}</b>
        </div>
      )}
    </div>
  );
}

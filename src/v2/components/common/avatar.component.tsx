import { generateRandomColor } from "@/v2/helpers/common.helpers";
import { UserData } from "@/v2/types/user.types";

export function UserAvatarV2({ user }: { user: UserData }) {
  const profile = user?.profiles?.[0];
  const color = generateRandomColor([String(user.id)]);
  const randomColor = {
    bg: `${color}3b`,
    fg: color,
  };
  const seedName =
    [
      profile?.username,
      `${profile?.firstName?.[0]}  ${profile?.lastName?.[0]}`,
      profile?.firstName,
      profile?.lastName,
      user.email,
    ].find(
      (item) =>
        item !== undefined && item.length > 1 && !item.includes("undefined")
    ) || user.email;
  const initials = `${seedName.slice(0, 2)}`;


 

  return (
    <div className="aspect-square w-full h-full ">
      {profile?.avatar ? (
        <img
          className="w-full h-full hidden bg-slate-400/20 rounded-full object-cover"
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
          <b className="uppercase font-[900]">{initials}</b>
        </div>
      )}
    </div>
  );
}

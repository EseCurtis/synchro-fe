"use client";

import { useNProgress } from "@/hooks/useNProgress";
import { SidebarNavs } from "@/utils/contents/sidebarNavs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const listStyle = {
  listStyleType: "none",
};

const DashboardBoardSidebar = () => {
  const pathname = usePathname();
  const { startProgress } = useNProgress();

  return (
    <div
      className="w-full py-5 px-5  h-[100vh] "
      style={{
        borderRight: "1px solid #CED3E4",
        backgroundImage: "url(/images/background/sidebar.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div>
        <Image
          src={"/images/synco_logo.png"}
          width={100}
          height={20}
          alt="Logo"
        />
      </div>

      <div className="my-[3em] pb-[2em]">
        <ul style={listStyle}>
          {SidebarNavs.map((_, index) => {
            const active = _.absoluteMatch
              ? pathname == _.path
              : pathname.includes(_.path);
            return (
              <Link
                href={_.path}
                key={index}
                onClick={() => {
                  startProgress();
                }}
              >
                <li
                  className="py-[14px] rounded-md p-4 flex items-center gap-[16px] "
                  style={{
                    color: "#718096",
                    background: active ? "rgba(233, 160, 132, 0.12)" : "",
                  }}
                >
                  <Image
                    src={_.active}
                    width={24}
                    height={24}
                    alt="icons"
                    style={{ display: active ? "unset" : "none" }}
                  />
                  <Image
                    src={_.img}
                    width={24}
                    height={24}
                    alt="icons"
                    style={{ display: active ? "none" : "unset" }}
                  />
                  <span
                    className={
                      active
                        ? " text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-red-600"
                        : ""
                    }
                  >
                    {_.title}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DashboardBoardSidebar;

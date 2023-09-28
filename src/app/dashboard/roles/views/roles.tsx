"use client";
import RolesAndPermission from "@/app/_components/no_data/roles_and_permission";
import React, { Fragment, useState } from "react";
import { RolesComponent, AddNewRoleComponent } from "../components/roles_box";
import NewRole from "../components/new_role";

const data = [
  {
    role: "Admin",
    content: "Lorem ipsum dolor sit amet consectetur. Eu vestibulum tempor.",
  },
  {
    role: "Admin",
    content: "Lorem ipsum dolor sit amet consectetur. Eu vestibulum tempor.",
  },
  {
    role: "Technical Suport",
    content: "Lorem ipsum dolor sit amet consectetur. Eu vestibulum tempor.",
  },
  {
    role: "Technical Support",
    content: "Lorem ipsum dolor sit amet consectetur. Eu vestibulum tempor.",
  },
];

const RolesPage = () => {
  const [timer, setTimer] = useState<boolean>(true);
  setTimeout(() => {
    setTimer(false);
  }, 2500);

  return (
    <div>
      {timer ? (
        <RolesAndPermission />
      ) : (
        <div className="flex gap-5 flex-wrap">
          {data.map((_, key) => (
            <Fragment key={key}>
              <RolesComponent role={_.role} content={_.content} />
            </Fragment>
          ))}

          {/* Note: Replace the modalProps with the content you want the modal to
          show brah */}
          <AddNewRoleComponent
            title="Click here to add new role"
            modalProps={<NewRole/>}
          />
        </div>
      )}
    </div>
  );
};

export default RolesPage;

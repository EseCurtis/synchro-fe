import React from "react";
import { Button } from "../button";
import { NoRoleSvg } from "../icons";

const NoRolesMember = () => {
  return (
    <div className="w-[328px] my-[4em] text-center mx-auto ">
      <center>
        <div className="my-5">{NoRoleSvg}</div>
      </center>

      <h3 className="font-bold">Add a Member</h3>
      <p className="text-second_primary_text text-center">
        Click on the button below to add a member to your backoffice.
      </p>
      <Button>Add Member</Button>
    </div>
  );
};

export default NoRolesMember;

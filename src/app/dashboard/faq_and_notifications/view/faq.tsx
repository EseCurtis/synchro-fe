"use client";
import NoFaq from "@/app/_components/no_data/no_faq";
import React from "react";
import FaqBox from "../components/faqBox";
import { Fragment } from "react";
import { useState } from "react";
import { AddNewRoleComponent } from "../../roles/components/roles_box";

const Faqs = () => {
  const [view, setView] = useState(true);

  setTimeout(() => {
    setView(false);
  }, 2000);

  return (
    <div>
      {view ? (
        <NoFaq />
      ) : (
        <div className="flex gap-3 flex-wrap">
          {[1, 2, 1, 2, 1, 1].map((i, j) => (
            <Fragment key={j}>
              <FaqBox />
            </Fragment>
          ))}

          <div className="  w-[50] mx-auto">
            <AddNewRoleComponent title="Click here to add new FAQ" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Faqs;

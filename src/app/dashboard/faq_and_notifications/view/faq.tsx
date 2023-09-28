"use client";
import NoFaq from "@/app/_components/no_data/no_faq";
import React from "react";
import FaqBox from "../components/faqBox";
import { Fragment } from "react";
import { useState } from "react";
import { AddNewRoleComponent } from "../../roles/components/roles_box";
import NewFaq from "../components/new_faq";

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
        <div className="flex flex-col items-center gap-3">
          <div className="grid grid-cols-2 gap-3 flex-wrap">
            {[1, 2, 1, 2, 1, 1].map((i, j) => (
              <Fragment key={j}>
                <FaqBox />
              </Fragment>
            ))}
          </div>
          <div className="mt-3 items-left">
            <AddNewRoleComponent
              title="Click here to add new FAQ"
              modalProps={<NewFaq />}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Faqs;

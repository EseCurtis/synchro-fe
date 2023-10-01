"use client";

import React, { FC, ReactNode, useState } from "react";
import styles from "./index.module.css";

interface ITabData {
  header: string;
  component: ReactNode | string;
}

interface IpropsData {
  data: ITabData[];
}

const TabComponent: FC<IpropsData> = ({ data }: IpropsData) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className={`flex gap-[3em] ${styles.tab}`}>
        {data?.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`tab-button ${
              activeTab === index ? styles.active_tab : ""
            }`}
          >
            {tab?.header}
          </button>
        ))}
      </div>
      <div className="tab-content my-10">
        {data.map((tab, index) => (
          <div
            key={index}
            className={`tab-pane ${activeTab !== index ? "hidden" : ""}`}
          >
            {tab?.component}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabComponent;

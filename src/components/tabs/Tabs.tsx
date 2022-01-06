import React, {Fragment, ReactElement} from "react";
import { Tab } from '@headlessui/react'
type TabType = "default" | "small"

interface TabsProps extends React.HTMLAttributes<HTMLDivElement>{
  type: TabType;
  tabs: string[];
  panels: string[] | ReactElement[] | (() => JSX.Element)[];
}
function Tabs({type, tabs, panels}: TabsProps): ReactElement {
  const styles = {
    tabList: "inline-block ring-1 ring-grayscale-dark border-2 border-grayscale-light rounded-lg",
    tab: {
      default: "rounded-lg h-10 px-[19px] text-base font-normal leading-7-1/8 mr-1 last:mr-0 hover:bg-primary-light hover:text-grayscale-light active:bg-primary active:text-grayscale-light focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-20",
      small: "rounded-lg h-7-1/8 px-[19px] text-sm font-normal leading-7-1/8 mr-1 last:mr-0 hover:bg-primary-light hover:text-grayscale-light active:bg-primary active:text-grayscale-light focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-20",
      selected: "bg-secondary text-grayscale-light",
      unselected: "bg-transparent text-grayscale-darker"
    }
    ,
    tabActive: "bg-secondary"
  }

  const isDefaultType = type === "default";

  return (
    <Tab.Group>
      <Tab.List className={styles.tabList}>
        {tabs.map((tab, index) => (
          <Tab key={index} as={Fragment}>
            {({ selected }) => (
              <button
                className={`
                  ${isDefaultType ? styles.tab.default : styles.tab.small} 
                  ${selected ? styles.tab.selected : styles.tab.unselected}
                `}
              >
                {tab}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
          {panels.map((panel, index) => (
              <Tab.Panel key={index} className={"w-full h-20"}>{panel}</Tab.Panel>
          ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Tabs
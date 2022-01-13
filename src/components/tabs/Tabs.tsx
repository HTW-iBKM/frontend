import React, { Fragment, ReactElement } from "react";
import { Tab } from '@headlessui/react'
type TabType = "default" | "small"

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  type: TabType;
  tabs: (string | ReactElement)[];
  panels: (string | ReactElement)[];
}
function Tabs({ type, tabs, panels }: TabsProps): ReactElement {
  const styles = {
    tabList: "inline-block border border-grayscale-dark rounded-lg p-px",
    tab: {
      default: "m-px rounded-lg h-9 px-3 text-base font-normal leading-7-1/8 hover:bg-secondary-light hover:text-grayscale-light active:bg-primary active:text-grayscale-light active:hover:ring-0 focus:outline-none focus:ring-inset focus:ring-4 focus:ring-secondary focus:ring-opacity-20",
      small: "m-px rounded-lg h-7-1/8 px-3 text-sm font-normal leading-7-1/8 hover:bg-secondary-light hover:text-grayscale-light active:bg-primary active:text-grayscale-light focus:outline-none focus:ring-inset focus:ring-4 focus:ring-secondary focus:ring-opacity-20",
      selected: "bg-secondary text-grayscale-light hover:ring-0 focus:ring-0",
      unselected: "bg-transparent text-grayscale-darker"
    },
    tabActive: "bg-secondary",
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
      <Tab.Panels className={"block w-full h-[calc(100%-56px)] min-h-[calc(100%-56px)] max-h-[calc(100%-56px)]"}>
        {panels.map((panel, index) => (
          <Tab.Panel key={index} className={"w-full h-full"}>{panel}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Tabs
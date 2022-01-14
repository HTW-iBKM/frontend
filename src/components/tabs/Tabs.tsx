import React, {Dispatch, Fragment, ReactElement, SetStateAction, useEffect} from "react";
import { Tab } from '@headlessui/react'
type TabType = "default" | "small"

interface TabsProps{
  type: TabType;
  tabs: ({
    title: (string | ReactElement);
    accessor: string;
  })[];
  panels: (string| ReactElement)[];
  onTabChange?: Dispatch<SetStateAction<string>>;
  className?: string;
  inlineSelectFields: ReactElement[];
}
function Tabs({type, tabs, panels, onTabChange, inlineSelectFields}: TabsProps): ReactElement {
  const styles = {
    tabList: "inline-block ring-1 ring-grayscale-dark border-2 border-grayscale-light rounded-lg",
    tab: {
      default: "rounded-lg h-9 px-[19px] text-base font-normal leading-7-1/8 hover:bg-secondary-light hover:text-grayscale-light active:bg-primary active:text-grayscale-light active:hover:ring-0 focus:outline-none focus:ring-inset focus:ring-4 focus:ring-secondary focus:ring-opacity-20",
      small: "rounded-lg h-7-1/8 px-4 text-sm font-normal leading-7-1/8 hover:bg-secondary-light hover:text-grayscale-light active:bg-primary active:text-grayscale-light focus:outline-none focus:ring-inset focus:ring-4 focus:ring-secondary focus:ring-opacity-20",
      selected: "bg-secondary text-grayscale-light hover:ring-0 focus:ring-0",
      unselected: "bg-transparent text-grayscale-darker"
    },
    tabActive: "bg-secondary",
  }

  const isDefaultType = type === "default";

  useEffect(() => {
    if(onTabChange) onTabChange(tabs[0].accessor)
  }, [onTabChange]);

  return (
    <Tab.Group
      onChange={(index) => {
        if(onTabChange) onTabChange(tabs[index].accessor);
      }}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-body2">Graph:</span>
          <Tab.List className={styles.tabList}>
            {tabs.map((tab, index) => (
                <Tab key={index} as={Fragment}>
                  {({selected}) => (
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
        </div>
        {inlineSelectFields}
      </div>
      <Tab.Panels className={"block w-full h-[calc(100%-56px)] min-h-[calc(100%-56px)] max-h-[calc(100%-56px)]"}>
        {panels.map((panel, index) => (
          <Tab.Panel key={index} className={"w-full h-full"}>{panel}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Tabs

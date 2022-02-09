import React, { Dispatch, Fragment, ReactElement, SetStateAction, useEffect } from "react";
import { Tab } from '@headlessui/react'
type TabType = "default" | "small"
import { Oval } from 'react-loader-spinner'
import { useStore } from "../../store/Store";
interface TabsProps {
  label?: string;
  type: TabType;
  tabs: ({
    title: (string | ReactElement);
    accessor: string;
  })[];
  panels: (string | ReactElement)[];
  onTabChange?: Dispatch<SetStateAction<string>>;
  className?: string;
  inlineSelectFields?: ReactElement[];
  index?: number
}
function Tabs({ label, type, tabs, panels, onTabChange, inlineSelectFields, index }: TabsProps): ReactElement {
  const styles = {
    tabList: "inline-block border border-grayscale-dark rounded-lg p-px",
    tab: {
      default: "m-px rounded-lg h-9 px-3 text-base font-normal leading-7-1/8 hover:bg-secondary-light hover:text-grayscale-light active:bg-primary active:text-grayscale-light active:hover:ring-0 focus:outline-none focus:ring-inset focus:ring-4 focus:ring-secondary focus:ring-opacity-20",
      small: "m-px rounded-lg h-7-1/8 px-3 text-sm font-normal leading-7-1/8 hover:bg-secondary-light hover:text-grayscale-light active:bg-primary active:text-grayscale-light focus:outline-none focus:ring-inset focus:ring-4 focus:ring-secondary focus:ring-opacity-20",
      selected: "bg-secondary text-grayscale-light hover:ring-0 focus:ring-0",
      unselected: "bg-transparent text-grayscale-darker"
    },
    spinnerWrapperStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%", height: "100%", position: "absolute", zIndex: "40",
      backgroundColor: "#FAFAFA",
      stroke:"red",
    },
    spinnerStyle: {
      color:"#212E50",
      secondaryColor: "#88B4CD",
      width: "10%%",
      height: "10%",
    },
    tabActive: "bg-secondary",
  }
  const legendProperties = useStore((state) => state.legendProperties);

  const isDefaultType = type === "default";

  useEffect(() => {
    if (onTabChange) onTabChange(tabs[0].accessor)
  }, [onTabChange]);

  return (
    <Tab.Group
      defaultIndex={index}
      onChange={(index) => {
        if (onTabChange) onTabChange(tabs[index].accessor);
      }}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          {label && <span className="text-body2">{label}</span>}
          <Tab.List className={styles.tabList} >
            {tabs.map((tab, index) => (
              <Tab key={index} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`
                  ${isDefaultType ? styles.tab.default : styles.tab.small} 
                  ${selected ? styles.tab.selected : styles.tab.unselected}
                `}>
                    {tab.title}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>
        {inlineSelectFields}
      </div>
      <Tab.Panels className={"block w-full h-[calc(100%-56px)] min-h-[calc(100%-56px)] max-h-[calc(100%-56px)] relative"}>
        {
          legendProperties.show &&
          <Oval wrapperStyle={styles.spinnerWrapperStyle}
            {...styles.spinnerStyle}

          ></Oval>
        }
        {panels.map((panel, index) => (
          <Tab.Panel key={index} className={"w-full h-full"}>{panel}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Tabs

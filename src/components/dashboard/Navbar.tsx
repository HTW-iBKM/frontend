import React, { ReactElement } from "react";
import UserIcon from "../icons/UserIcon";
import LocationIcon from "../icons/LocationIcon";
import PowerIcon from "../icons/PowerIcon";
import SettingsIcon from "../icons/SettingsIcon";
import EditIcon from "../icons/EditIcon";
import auth from "../../services/Auth";
import { useHistory } from "react-router-dom";
import RadioButtonGroup from "../form/RadioButtonGroup";
import { CoreMenuItemProps } from "./MenuItem";
import ContextMenu from "./ContextMenu";
import { useStore } from "../../store/Store";



function Navbar(): ReactElement {
  const [bilanzKreise, _] = useStore((state) => [state.bilanzKreise, state.setBilanzKreise]);
  const [selectedBilanzKreis, setSelectedBilanzKreis] = useStore(state => [state.selectedBilanzKreis, state.setSelectedBilanzKreis]);
  const history = useHistory();
  const [setIsSelectionOpen] = useStore(state => [state.setSelectionModalOpen]);


  const balancingGroupMenuItems: CoreMenuItemProps[] = [
    {
      icon: <EditIcon />,
      buttonText: "Bearbeiten",
      onClick: () => setIsSelectionOpen(true)
    }
  ];

  const userMenuItems: CoreMenuItemProps[] = [
    {
      icon: <SettingsIcon />,
      buttonText: "Einstellungen",
    },
    {
      icon: <PowerIcon />,
      buttonText: "Abmelden",
      onClick: () => auth.logout(() => history.push("login")),
    },
  ];

  return (
    <div className={"h-full flex items-center justify-between "}>
      <h6 className="text-h6">Exxeta iBKM</h6>
      <div className="flex flex-row gap-16 px-4">
        <ContextMenu
          anchorIcon={<LocationIcon />}
          anchorLabel={selectedBilanzKreis || "Keine Auswahl"}
          menuItems={balancingGroupMenuItems}
          customMenuItem={
            bilanzKreise.length != 0 &&
            <RadioButtonGroup
              selected={selectedBilanzKreis}
              onChange={setSelectedBilanzKreis}
              options={bilanzKreise}
            />
          }
          itemsLength={bilanzKreise.length}
        />
        <ContextMenu anchorIcon={<UserIcon />} menuItems={userMenuItems} />
      </div>
    </div>
  );
}

export default Navbar;

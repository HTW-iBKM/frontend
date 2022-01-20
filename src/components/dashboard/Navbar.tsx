import React, { ReactElement, useState } from "react";
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

function Navbar(): ReactElement {
  const history = useHistory();
  const [balancingGroup, setBalancingGroup] = useState("Bilanzkreis A");

  const balancingGroupMenuItems: CoreMenuItemProps[] = [
    {
      icon: <EditIcon />,
      buttonText: "Bearbeiten",
    },
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
          anchorLabel={balancingGroup}
          menuItems={balancingGroupMenuItems}
          customMenuItem={
            <RadioButtonGroup
              selected={balancingGroup}
              onChange={setBalancingGroup}
              options={["Bilanzkreis A", "Bilanzkreis B", "Bilanzkreis C"]}
            />
          }
        />

        <ContextMenu anchorIcon={<UserIcon />} menuItems={userMenuItems} />
      </div>
    </div>
  );
}

export default Navbar;

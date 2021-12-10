import React, {ReactElement} from 'react';
import DashboardLayout from "../../layouts/DashboardLayout";
import Navbar from "../../components/dashboard/Navbar";
import Center from "../../components/dashboard/Center";
import Sidebar from "../../components/dashboard/Sidebar";

function Dashboard(): ReactElement {
  return (
    <DashboardLayout
      left={<Sidebar/>}
      top={<Navbar/>}
      center={<Center/>}
    />
  );
}

export default Dashboard;

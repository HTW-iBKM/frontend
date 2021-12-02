import React, {ReactElement} from 'react';
import Layout from "../../layouts/Layout";
import Navbar from "../../components/dashboard/Navbar";
import Center from "../../components/dashboard/Center";
import Sidebar from "../../components/dashboard/Sidebar";

function Dashboard(): ReactElement {
  return (
    <Layout
      left={<Sidebar/>}
      top={<Navbar/>}
      center={<Center/>}
    />
  );
}

export default Dashboard;

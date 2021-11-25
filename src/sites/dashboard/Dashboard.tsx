import React, {ReactElement} from 'react';
import './dashboard.css';
import Layout from "../../layouts/Layout";
import Navbar from "../../components/dashboard/Navbar";
import Center from "../../components/dashboard/Center";
import Sidebar from "../../components/dashboard/Sidebar";
import {useRouteMatch} from "react-router-dom";

function Dashboard(): ReactElement {
  const match = useRouteMatch();
  console.log(match.path);
  return (
    <Layout
      left={<Sidebar/>}
      top={<Navbar/>}
      center={<Center/>}
    />
  )
}

export default Dashboard;

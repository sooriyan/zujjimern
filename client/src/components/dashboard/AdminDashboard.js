import React from 'react';
import RecentReq from '../admin/RecentReq';
import RecentProjects from '../admin/RecentProjects';
const AdminDashboard = () => {
  return (
    <>
      <RecentProjects />
      <br />
      <RecentReq />
      <br />
    </>
  );
};

export default AdminDashboard;

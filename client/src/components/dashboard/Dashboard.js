import React from 'react';
import RecentProjects from '../user/RecentProjs';
import RecentReqs from '../user/RecentReqs';
const Dashboard = () => {
  return (
    <>
      <RecentProjects />
      <br />
      <RecentReqs />
      <br />
    </>
  );
};

export default Dashboard;

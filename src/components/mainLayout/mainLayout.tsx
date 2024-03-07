import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../navBar/navBar';

const MainLayout = () => {
	return (
		<>
			<NavBar />
      <div style={{marginTop: "56px"}}>
			  <Outlet />
      </div>
		</>
	);
};

export default MainLayout;
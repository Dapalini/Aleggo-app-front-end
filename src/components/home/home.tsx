import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Home = () => {
	return (
		<div className='row align-items-start'>
			<div className='col-2 border'>
				<div className='list-group list-group-flush'>
					<Link
						to='/main/home/overview'
						className='list-group-item list-group-item-action'
					>
						Overview
					</Link>
					<Link
						to='/main/home/calendar'
						className='list-group-item list-group-item-action'
					>
						Calendar
					</Link>
					<Link
						to='/main/home/todo'
						className='list-group-item list-group-item-action'
					>
						To do list
					</Link>
				</div>
			</div>
			<div className='col'>
				<Outlet />
			</div>
		</div>
	);
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const BasicInfo = ({basicInfo}: any) => {

	const { name, fullAddress, startDate, _id, customerNumber } = basicInfo

	// const workerArray = [];

	// placeData.workplan.forEach((worker) => {
	// 	const workerObj = {
	// 		workerType: worker.workerTypeValue.label,
	// 		workerName: worker.assignedValue.label
	// 	};
	// 	workerArray.push(workerObj);
	// });

	console.log(basicInfo)

	return (
		<div
			style={{ maxWidth: '1040px' }}
			className='shadow p-4 m-6 bg-white rounded border'
		>
			<div className='d-flex justify-content-between'>
				<h3>Basic Information</h3>
				<Link to={`/main/places/${_id}/basicInfoEdit`}>
					<ModeEditOutlinedIcon sx={{ fontSize: 24 }} color='action' />
				</Link>
			</div>
			<div className='row mt-3 d-flex justify-content-between align-items-end'>
				<div style={{ maxWidth: '520px' }}>
					<h3>{`${customerNumber} - ${name}`}</h3>
					<div className='row align-items-end'>
						<h4 style={{ width: 'auto' }}>{fullAddress}</h4>
						<a
							className='col-1 mb-3'
							href='https://www.google.com/maps/search/?api=1City+Hall%2C+New+York%2C+NY'
							target='_blank'
							rel='noreferrer'
						>
							<LocationOnOutlinedIcon sx={{ fontSize: 24 }} color='action' />
						</a>
					</div>
				</div>
				<div style={{ width: '320px' }}>
					<div>
						Contract start date: {`${new Date(startDate).toDateString()}`}
					</div>
					<div>
						Last workplan update: {`${new Date(startDate).toDateString()}`}
					</div>
				</div>
			</div>
			<br></br>
			<div className='row'>
				{ basicInfo.summaryData ? 
					<div
						style={{ maxWidth: '48%' }}
						className='shadow p-3 m-2 col-11 bg-white rounded border'
					>
						<h5>Summary</h5>
						{basicInfo.summaryData}
					</div> : null
				}
				{/* <div
					style={{ width: '48%' }}
					className='shadow p-3 m-2 col-11 bg-white rounded border'
				>
					<div>
						{workerArray.map((worker, index) => (
							<div key={`${worker}-${index}`}>
								{`${worker.workerType}: ${worker.workerName}   `}
								<ModeEditOutlinedIcon sx={{ fontSize: 24 }} color='action' />
							</div>
						))}
					</div>
				</div> */}
			</div> 
			<div className='row'>
				{	basicInfo.importantNotes.length > 0 ? 
					<div
						style={{ maxWidth: '990px' }}
						className='shadow p-3 m-2 bg-white rounded border'
					>
						<h5>Important notes</h5>
						{basicInfo.importantNotes}
					</div> : null
				}
			</div>
			<div className='row'>
				{	basicInfo.accessData.length > 0 ? 
					<div
						style={{ width: '990px' }}
						className='shadow p-3 m-2 bg-white rounded border'
					>
						<h5>Data on keys</h5>
						{basicInfo.accessData}
					</div> : null				
				}
			</div>
			<div className='row'>
				{basicInfo.contactData.map((contact: any, contactIndex: any) => (
					<div
						style={{ width: '31.4%' }}
						className='shadow p-3 m-2 bg-white rounded border'
						key={`${contact.contactType}-${contactIndex}`}
					>
						<h5>{contact.contactType.label}</h5>
						{contact.data.map((data: any, dataIndex: any) => (
							<div
								key={`${data.label}-${dataIndex}`}
							>{`${data.label.label}: ${data.value}`}</div>
						))}
						{contact.contactNotes ? (
							<div className='mt-2'>
								<b>Note:</b> {`${contact.contactNotes}`}
							</div>
						) : null}
					</div>
				))}
			</div>
		</div>
	);
};

export default BasicInfo;

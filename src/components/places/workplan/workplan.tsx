import React from 'react';
import { Link } from 'react-router-dom';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

const Workplan = ({ placeData }: any) => {
	const { name, address, workplan, _id } = placeData;

	return (
		<div className='col-7 shadow p-5 mb-6 bg-white rounded border'>
			<div className='d-flex justify-content-between'>
				<h3>Workplans</h3>
				<Link to={`/main/places/${_id}/workplanEdit`}>
					<ModeEditOutlinedIcon sx={{ fontSize: 24 }} color='action' />
				</Link>
			</div>
			<h3>{name}</h3>
			<h4>{address}</h4>
			<br></br>
			<div>
				{workplan.map((worker: any, indexWorker: any) => (
					<div key={`worker-${indexWorker}`}>
						<h4>{`${worker.workerTypeValue.label} workplan`}</h4>
						<h4>{worker.assignedValue.label}</h4>
						{worker.assignment.map((task: any, indexAssign: any) => (
							<div key={`assignment-${indexAssign}`}>
								<h5>{`${
									task.frequency.value.label
								} on ${task.frequency.weekdays.map(
									(day: any) => `${day.label}`
								)}`}</h5>
								{task.tasks.map((job: any, indexInstruct: any) => (
									<div key={`instruction-${indexInstruct}`}>
										<h5>
											{`${
												job.amount > 1
													? job.amount + ' ' + job.taskValue.label + 's'
													: job.taskValue.label
											}`}
											<AccessTimeOutlinedIcon
												sx={{ fontSize: 24 }}
												color='action'
											/>
											{job.duration}
										</h5>
										<ul>
											{job.instruction.split('\n').map((step: any, indexStep: any) => (
												<li key={`step-${indexStep}`}>{step}</li>
											))}
										</ul>
									</div>
								))}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Workplan;

import { useState, useEffect } from "react";
import { useUpdate } from "react-use";
import FormikControl from "../../formikControl/formikControl" 
import _ from "lodash"
import CustomButton from "../../common/customButton";
import { useFormikContext, FieldArray } from 'formik';
import { dateNoteInitialValues, contactDataInitialValues } from "../../../typesValidationInitialvalues/basicInfoTypes";
import { DndProvider, useDragDropManager } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropZone from "../../../wrappers/dropZone";
import { handleContactLabelHttpPostRequest } from "../../../services/labelServices";
import ContactCard from "./contactCard";

const BasicInfoEdit = ({basicInfo, loading, values}: any) => {

	const { setValues }: any = useFormikContext()
	
	// useEffect(() => {
	// 	if(!loading){
	// 		setValues(basicInfo)
	// 	}
	// },[loading])

	const {
		isEndDate,
		contactData,
		importantNotes,
		accessNotes,
	} = values

	// console.log("Formik values at Basic Info edit", formik)

	const [dragIndex, setDragIndex] = useState<boolean | number>(false);
	const [isDragging, setIsDragging] = useState(false);

	const handleDragStart = (drag: any, index: any) => {
		setIsDragging(drag);
		setDragIndex(index);
	};

	const update = useUpdate()

	useEffect(() => {
		update()
	},[update, values])

	const handleDragEnd = () => {
		setIsDragging(false);
		setDragIndex(false);
	};

	// console.log("Rerender, with these contacts:", contactData, values)

	// const handleShift = (oldIndex: any, newIndex: any) => {
	// 	console.log("Shifttest", [...values.contactData])
	// 	console.log(oldIndex, newIndex)
	// }
	// const handlehandleShift = () => {
	// 	handleShift(1,2)
	// }

	// handlehandleShift()

	const handleDrop = (itemType: any, oldIndex: any, newIndex: any) => {
		console.log("Pushtest", values, {...values}, [...values.contactData])
		console.log(itemType, oldIndex, newIndex);
		// handleShift(oldIndex, newIndex)
		// let newContactData = [...values.contactData]
		// const shiftedItem = newContactData[oldIndex];
		// newContactData.splice(newIndex, 0, shiftedItem);
		// if (oldIndex < newIndex) {
		// 	newContactData.splice(oldIndex, 1);
		// } else {
		// 	newContactData.splice(oldIndex + 1, 1);
		// }
		// setIsDragging(false);
		// setDragIndex(false);
		// setValues({...values, contactData: newContactData});
		return;
	};

	// const removeContact = (index: any) => {
	// 	let newContacts = [...values.contactData]
	// 	newContacts.splice(index, 1)
	// 	console.log("Pushtest", {...values,contactData: newContacts})
	// 	setValues({...values,contactData: newContacts})
	// }

	// const pushContact = () => {
	// 	let newContacts = [...values.contactData]
	// 	newContacts.push(contactDataInitialValues)
	// 	setValues({...values,contactData: newContacts})
	// }

	console.log(values)

	return (
		<div>
			<div style={{
				width: "100%",
				position:"fixed",
				background: "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 96%, rgba(255, 255, 255, 0) 100%)",
				paddingLeft: "20px",
				paddingBottom: "8px"
			}}>
				<div className='d-flex justify-content-between'>
					<h3 className="col-5">Basic Information Editing</h3>
					<div className="col-7 d-flex justify-content-beginning">
						<FormikControl
							style={{width: "80px"}}
							control="submitButton"
							text="Save"
						/>
						<CustomButton
							style={{width: "80px"}}
							className="ms-2"
							text="Cancel"
						/>
					</div>
				</div>
			</div>
			<div
				style={{ maxWidth: '1040px' }}
				className='shadow p-4 m-6 bg-white rounded border'
			>
				<div className='row mt-3 d-flex justify-content-between'>
					<div style={{ maxWidth: '710px' }}>
						<FormikControl
							control="input"
							name="customerNumber"
							label="customer code"					
						/>
						<FormikControl
							control="input"
							name="name"
							label="place name"					
						/>
						<div className='row align-items-end'>
							<FormikControl
								control="input"
								name="fullAddress"
								label="full address"					
							/>
							<FormikControl
								control="autocompleteGoogleMaps"
								name="addressLocation"
								label="exact address location"					
							/>
						</div>
					</div>
					<div  style={{ width: '300px' }}>
						<div className="row">
							<div className="col-1"/>
							<div className="col-10">
								<FormikControl
									control="datePicker"
									name="startDate"
									label="start date"
								/>
							</div>
						</div>
						<div style={{marginTop: "4px"}} className="row">
							<div
								style={{ marginTop: "34px"}} 
								className="col-1"
							>
								<FormikControl
									control="checkBox"
									name="isEndDate"
								/>
							</div>
							<div className="col-10">
								<FormikControl
									control="datePicker"
									name="endDate"
									label="end date"
									disabled={!isEndDate}
								/>
							</div>
						</div>
					</div>
				</div>
				<br></br>
				<div className='row'>
					<FormikControl 
						control="textArea"
						name="summaryData"
						label="summary description of place (for ex. size, standards etc.)"
					/>
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
					<div className="col-12 mt-1">
						<span style={{fontSize: "14px", fontWeight: "bold"}}>important notes</span>
						<div 
							className='p-2 bg-white rounded border'
						>
							<FieldArray
								name="importantNotes"
								render={(arrayHelpers) =>
									<div>
										<div>
											{ importantNotes && importantNotes.length > 0 ? (
													importantNotes.map(( note: any, importantNotesIndex: any ) => (
														<div key={importantNotesIndex}>
															<div className="row d-flex align-items-start">
																<div className="col-8 mb-2">
																	<FormikControl
																		style={{marginTop: "-24px"}}
																		control="textArea"
																		name={`importantNotes[${importantNotesIndex}].note`}
																	/>
																</div>
																<div className="col-3 mb-2">
																	<span>{`(Written: ${note.date})`}</span>
																</div>
																<div className="col-1 d-flex justify-content-end">
																	<CustomButton 
																		text="delete"
																		onClick={() => arrayHelpers.remove(importantNotesIndex)}
																	/>
																</div>
															</div>
														</div>
														)
													)
												) : null
											}
										</div>
										<CustomButton 
											text="add entry"
											onClick={() => arrayHelpers.push(dateNoteInitialValues)}
										/>
									</div>
								} 
							/>
						</div> 
					</div>
				</div>
				<div className='row'>
					<div className="col-12 mt-1">
						<span style={{fontSize: "14px", fontWeight: "bold"}}>{"access notes (keys gotten, codes etc.)"}</span>
						<div 
							className='p-2 bg-white rounded border'
						>
							<FieldArray
								name="accessNotes"
								render={(arrayHelpers) =>
									<div>
										<div>
											{ accessNotes && accessNotes.length > 0 ? (
													accessNotes.map(( note: any, accessNotesIndex: any ) => (
														<div key={accessNotesIndex}>
															<div className="row d-flex align-items-start">
																<div className="col-8 mb-2">
																	<FormikControl
																		style={{marginTop: "-24px"}}
																		control="textArea"
																		name={`accessNotes[${accessNotesIndex}].note`}
																	/>
																</div>
																<div className="col-3 mb-2">
																	<span>{`(Written: ${note.date})`}</span>
																</div>
																<div className="col-1 d-flex justify-content-end">
																	<CustomButton 
																		text="delete"
																		onClick={() => arrayHelpers.remove(accessNotesIndex)}
																	/>
																</div>
															</div>
														</div>
														)
													)
												) : null
											}
										</div>
										<CustomButton 
											text="add entry"
											onClick={() => arrayHelpers.push(dateNoteInitialValues)}
										/>
									</div>
								} 
							/>
						</div> 
					</div>
				</div>
				<div className="mt-3 mb-1 row d-flex justify-content-beginning">
					<h4>Contacts</h4>
				</div>
				<div>
					{/* { contactData && contactData.length > 0 ?
							contactData.map((contact: any, contactDataIndex: any ) => (
								<div key={`contact-${contactDataIndex}`}>
									{contactDataIndex === 0 && dragIndex !== 0 ? (
										<div className="mt-2 mb-2">
											<DropZone
												item="CONTACT"
												index={contactDataIndex}
												isDragging={isDragging}
												onDrop={(acceptItem: any, oldIndex: any, newIndex: any) => handleDrop(acceptItem, oldIndex, newIndex, valuesCopy, contactDataCopy)}
											/>
										</div>
										) : null}
										<div onDragEnd={handleDragEnd}>
											<div className="row d-flex align-items-start">
												<div className="col-10 mb-2">
													<ContactCard
														name={`contactData[${contactDataIndex}]`}
														contact={contact}
														index={contactDataIndex}
														isDragging={isDragging}
														raiseDragStart={handleDragStart}
													/>
												</div>
												<div className="col-1 d-flex justify-content-end">
													<CustomButton 
														text="delete"
														onClick={() => removeContact(contactDataIndex)}
													/>
												</div>
											</div>
									</div>
									{dragIndex !== contactDataIndex && dragIndex !== contactDataIndex + 1 ? (
										<div className="mt-2 mb-2">
											<DropZone
												item="CONTACT"
												index={contactDataIndex+1}
												isDragging={isDragging}
												onDrop={(acceptItem: any, oldIndex: any, newIndex: any) => handleDrop(acceptItem, oldIndex, newIndex, valuesCopy, contactDataCopy)}
											/>
										</div>
									) : null}
								</div>
							)
						) : null 
					}
				</div>
				<CustomButton
					text="add contact"
					action={()=> pushContact()}
				/> */}
				<FieldArray 
					name={`contactData`}
					render={(arrayHelpers) =>
						<div>
							<div>
									{ contactData && contactData.length > 0 ?
											contactData.map((contact: any, contactDataIndex: any ) => {
												// const transferDrop = () => {
												// 	console.log("Transfer", formikValues.contactData)
												// }
												return (
													<div key={`contact-${contactDataIndex}`}>
															<div className="mt-2 mb-2">
																<DropZone
																	transferDrop={handleDrop}
																	item="CONTACT"
																	index={contactDataIndex}
																	isDragging={isDragging}
																	raiseDrop={handleDrop}
																	style={{ display: `${ contactDataIndex === 0 && dragIndex !== 0 ? "block" : "none"}`}}
																/>
															</div>
															<div onDragEnd={handleDragEnd}>
																<div className="row d-flex align-items-start">
																	<div className="col-10 mb-2">
																		<ContactCard
																			name={`contactData[${contactDataIndex}]`}
																			contact={contact}
																			index={contactDataIndex}
																			isDragging={isDragging}
																			raiseDragStart={handleDragStart}
																		/>
																	</div>
																	<div className="col-1 d-flex justify-content-end">
																		<CustomButton 
																			text="delete"
																			onClick={() => arrayHelpers.remove(contactDataIndex)}
																		/>
																	</div>
																</div>
														</div>
															<div className="mt-2 mb-2">
																<DropZone
																	item="CONTACT"
																	index={contactDataIndex+1}
																	isDragging={isDragging}
																	raiseDrop={handleDrop}
																	style={{ display: `${ dragIndex !== contactDataIndex && dragIndex !== contactDataIndex + 1 ? "block" : "none"}`}}
																/>
															</div>
												</div>
											)
											}
										) : null 
									}
							</div>
							<CustomButton
								text="add contact"
								action={()=> arrayHelpers.push(contactDataInitialValues)}
							/>
						</div>
					}
				/>
			</div>
		</div>
		</div>
	 );
}
 
export default BasicInfoEdit;

// import React, { useState } from 'react';
// import { useUpdate } from 'react-use';

// import { Link } from 'react-router-dom';

// import { contactTypes, dataTypeOptions } from '../../../services/fakeInputAPI';

// import ContactCard from './contactCard';
// import DropZone from '../../../wrappers/dropZone';

// import { DndProvider } from 'react-dnd';

// import { HTML5Backend } from 'react-dnd-html5-backend';

// const BasicInfoEdit = () => {
// 	const update = useUpdate();

// 	const initialBasicInfoObj = {
// 		accessData: placeData.basicInfo.accessData,
// 		addressLocation: placeData.addressLocation,
// 		contactData: placeData.basicInfo.contactData,
// 		customerNumber: placeData.customerNumber,
// 		endDate: placeData.endDate,
// 		fullAddress: placeData.fullAddress,
// 		_id: placeData._id,
// 		importantNotes: placeData.basicInfo.importantNotes,
// 		isEndDate: false,
// 		name: placeData.name,
// 		startDate: placeData.startDate,
// 		summaryData: placeData.basicInfo.summaryData
// 	};

// 	const [basicInfoObj, setBasicInfoObj] = useState(initialBasicInfoObj);

// 	const {
// 		accessData,
// 		addressLocation,
// 		contactData,
// 		customerNumber,
// 		endDate,
// 		fullAddress,
// 		_id,
// 		isEndDate,
// 		importantNotes,
// 		name,
// 		startDate,
// 		summaryData
// 	} = basicInfoObj;
	
// 	const handleCancel = () => {
// 		setBasicInfoObj(initialBasicInfoObj);
// 	};

// 	const handleSave = () => {

// 	};

// 	const handleChange = (newValue, path, index) => {
// 		const newBasicInfoObj = basicInfoObj;
// 		if (path[0] === 'contactData') {
// 			if (path[1] === 'data') {
// 				newBasicInfoObj[path[0]][index[0]][path[1]][index[1]][path[2]] =
// 					newValue;
// 				setBasicInfoObj(newBasicInfoObj);
// 				update();
// 				return;
// 			} else {
// 				newBasicInfoObj[path[0]][index[0]][path[1]] = newValue;
// 				setBasicInfoObj(newBasicInfoObj);
// 				update();
// 				return;
// 			}
// 		} else {
// 			newBasicInfoObj[path[0]] = newValue;
// 			setBasicInfoObj(newBasicInfoObj);
// 			update();
// 			return;
// 		}
// 	};

// 	const [dragIndex, setDragIndex] = useState(false);
// 	const [isDragging, setIsDragging] = useState(false);

// 	const handleDragStart = (drag, index) => {
// 		setIsDragging(drag);
// 		setDragIndex(index);
// 	};

// 	const handleDragEnd = () => {
// 		setIsDragging(false);
// 		setDragIndex(false);
// 	};

// 	const handleDrop = (itemType, oldIndex, newIndex) => {
// 		console.log(itemType, oldIndex, newIndex);
// 		let newContactDataObj = contactData;
// 		console.log(newContactDataObj);
// 		let newBasicInfoObj = basicInfoObj;
// 		const shiftedItem = newContactDataObj[oldIndex];
// 		newContactDataObj.splice(newIndex, 0, shiftedItem);
// 		if (oldIndex < newIndex) {
// 			newContactDataObj.splice(oldIndex, 1);
// 		} else {
// 			newContactDataObj.splice(oldIndex + 1, 1);
// 		}
// 		newBasicInfoObj.contactData = newContactDataObj;
// 		setIsDragging(false);
// 		setDragIndex(false);
// 		setBasicInfoObj(newBasicInfoObj);
// 		update();
// 		return;
// 	};

// 	return (
// 		<DndProvider backend={HTML5Backend}>
// 			<div
// 				style={{ maxWidth: '1040px' }}
// 				className='form-control shadow p-4 m-6 bg-white rounded'
// 			>
// 				<div className='row justify-content-between'>
// 					<h3 className='col-4'>Basic information edit</h3>
// 					<div style={{ width: 'auto' }}>
// 						<Link
// 							to={`/main/places/${_id}/basicInfo`}
// 							className='btn btn-primary m-1'
// 							onClick={() => handleCancel()}
// 						>
// 							Cancel
// 						</Link>
// 						<button
// 							className='btn btn-primary m-1'
// 							onClick={(e) => {
// 								handleSave(e);
// 							}}
// 						>
// 							Save
// 						</button>
// 					</div>
// 				</div>
// 				<div className='row mt-2 justify-content-start'>
// 					<div className='col-2'>
// 						<label htmlFor='customerNumber'>Property code</label>
// 						<input
// 							className='form-control shadow'
// 							id='customerNumber'
// 							type='customerNumber'
// 							value={customerNumber}
// 							onChange={(e) => {
// 								handleChange(e.target.value, ['customerNumber']);
// 							}}
// 						/>
// 					</div>
// 					<div className='col'>
// 						<label htmlFor='propertyName'>Property name</label>
// 						<input
// 							className='form-control shadow'
// 							id='propertyName'
// 							type='text'
// 							value={name}
// 							onChange={(e) => {
// 								handleChange(e.target.value, ['name']);
// 							}}
// 						/>
// 					</div>
// 				</div>
// 				<div>
// 					<label htmlFor='fullAddress'>Full address</label>
// 					<input
// 						className='form-control shadow'
// 						id='fullAddress'
// 						type='text'
// 						value={fullAddress}
// 						onChange={(e) => {
// 							handleChange(e.target.value, [fullAddress]);
// 						}}
// 					/>
// 				</div>
// 				<div className='mt-2 col-6'>
// 					<label htmlFor='addressLocation'>Address location</label>
// 					<input
// 						className='form-control shadow'
// 						id='addressLocation'
// 						type='text'
// 						value={addressLocation}
// 						onChange={(e) => {
// 							handleChange(e, ['addressLocation']);
// 						}}
// 					/>
// 				</div>
// 				<div className='row'>
// 					<div className='col-3 mt-2'>
// 						<label
// 							htmlFor='startDate'
// 							style={{
// 								width: '140px',
// 								fontSize: '12px'
// 							}}
// 						>
// 							Start date
// 						</label>
// 						<input
// 							className='form-control shadow'
// 							id='startDate'
// 							type='date'
// 							value={startDate}
// 							onChange={(e) => {
// 								handleChange(e.target.value, ['startDate']);
// 							}}
// 						/>
// 					</div>
// 					<input
// 						checked={isEndDate}
// 						className='ms-4 me-1'
// 						style={{ width: '16px', marginTop: '30px' }}
// 						id='endDateCheck'
// 						name='endDateCheck'
// 						type='checkBox'
// 						value=''
// 						onChange={() => handleChange(!isEndDate, ['isEndDate'])}
// 					/>
// 					<div className='col-3 mt-2'>
// 						<label
// 							htmlFor='endDate'
// 							style={{
// 								width: '140px',
// 								fontSize: '12px',
// 								color: isEndDate ? 'black' : 'lightgray'
// 							}}
// 						>
// 							End date:
// 						</label>
// 						<input
// 							className={`form-control ${isEndDate ? 'shadow' : ''}`}
// 							disabled={!isEndDate}
// 							id='endDate'
// 							onChange={(e) => {
// 								handleChange(e.target.value, ['endDate']);
// 							}}
// 							style={{ color: isEndDate ? 'black' : 'gray' }}
// 							type='date'
// 							value={isEndDate ? endDate : ''}
// 						/>
// 					</div>
// 				</div>
// 				<div className='mt-2'>
// 					<label htmlFor='summaryData'>Summary of property</label>
// 					<textarea
// 						className='form-control shadow'
// 						id='summaryData'
// 						type='textArea'
// 						value={summaryData}
// 						onChange={(e) => {
// 							handleChange(e.target.value, ['summaryData']);
// 						}}
// 					/>
// 				</div>
// 				<div className='mt-2'>
// 					<label htmlFor='importantNotes'>Important notes</label>
// 					<textarea
// 						className='form-control shadow'
// 						id='importantNotes'
// 						type='textArea'
// 						value={importantNotes}
// 						onChange={(e) => {
// 							handleChange(e.target.value, ['importantNotes']);
// 						}}import SelectCreatable from '../../formikControl/selectCreatable';
// 					/>import { handleContactLabelHttpPostRequest } from '../../../services/labelServices';


// 				</div>
// 				<div className='mt-2'>
// 					<label htmlFor='accessData'>Data on keys / access</label>
// 					<textarea
// 						className='form-control shadow'
// 						id='accessData'
// 						type='textArea'
// 						value={accessData}
// 						onChange={(e) => {
// 							handleChange(e.target.value, ['accessData']);
// 						}}
// 					/>
// 				</div>

// 				{contactData.map((contact, contactIndex) => (
// 					<div key={`${contact.contactType}-${contactIndex}`}>
// 						{contactIndex === 0 && dragIndex !== 0 ? (
// 							<DropZone
// 								acceptItem={'CONTACT'}
// 								index={contactIndex}
// 								isDragging={isDragging}
// 								raiseDrop={handleDrop}
// 							/>
// 						) : null}
// 						<div onDragEnd={handleDragEnd}>
// 							<ContactCard
// 								contact={contact}
// 								contactIndex={contactIndex}
// 								contactTypes={contactTypes}
// 								dataTypeOptions={dataTypeOptions}
// 								onChange={handleChange}
// 								isDragging={isDragging}
// 								raiseDragStart={handleDragStart}
// 							/>
// 						</div>
// 						{dragIndex !== contactIndex && dragIndex !== contactIndex + 1 ? (
// 							<DropZone
// 								acceptItem={'CONTACT'}
// 								index={contactIndex + 1}
// 								isDragging={isDragging}
// 								raiseDrop={handleDrop}
// 							/>
// 						) : null}
// 					</div>
// 				))}
// 			</div>
// 		</DndProvider>
// 	);
// };

// export default BasicInfoEdit;



	// const handleCreate = async (newOption: any, setError: any) => {
  //   console.log("Req at info", newOption)
	// 	try {
	// 		console.log("Req at try")
	// 		const response = await handleContactLabelHttpPostRequest(setError, newOption)
	// 		console.log("response at try", response)
	// 		if(response){
	// 			console.log(response)
	// 			return response
	// 		}
	// 	} catch (err) {
	// 			console.log("Error on post label req in basic info componenet", err)
	// 			return null
	// 	}
	// };
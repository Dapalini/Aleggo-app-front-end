
import React from 'react';
import { contactDataTypeOptions, contactTypeOptions } from '../../../utilities/inputSelectValues';
import FormikControl from '../../formikControl/formikControl';
import { FieldArray } from 'formik';
import { useDrag } from 'react-dnd';
import CustomButton from '../../common/customButton';
import { contactDataItemInitialValues } from '../../../typesValidationInitialvalues/basicInfoTypes';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

const ContactCard = (
	{
	isDragging,
	raiseDragStart,
  name,
  contact,
	index
}: any
) => {
	const [{ isDragging: contactIsDragging }, drag, dragPreview] = useDrag(
		() => ({
			type: 'CONTACT',
			item: () => {
				raiseDragStart(true, index);
				return { index: index };
			},
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
		})
	);
  const path = `${name}.`
  contactTypeOptions.sort((a: any, b: any) => {
    return a.label.localeCompare(b.label)
  })
  contactDataTypeOptions.sort((a: any, b: any) => {
    return a.label.localeCompare(b.label)
  })

  return (
		<div
			ref={dragPreview}
			style={{
				opacity: contactIsDragging ? 0.6 : 1,
				overflow: 'hidden',
			}}
			className={`${isDragging ? 'DraggedItem-active-small' : 'DraggedItem-inactive'}`}
		>
			<div className='shadow p-3 bg-white rounded border'>
				<div className='row justify-content-between'>
					<div className='col-10'>
						<FormikControl
							name={`${path}contactType`}
							control="selectCreatable"
							label="contact type/position"
							optionType="contactTypeOptions"
							options={contactTypeOptions}
						/>
					</div>
					<div className='col-2 d-flex justify-content-end'>
						<div
							ref={drag}
							className=' me-4'
							style={{ cursor: 'move', width: '30px' }}
						>
							<div className='col-3'>
								<DragIndicatorOutlinedIcon sx={{ fontSize: 24 }} color='action'/>
							</div>
						</div>
					</div>
				</div>
				<FieldArray
					name={`${path}contactDataEntry`}
					render={(arrayHelpers) =>
						<div>
							{ contact.contactDataEntry && contact.contactDataEntry.length > 0 ?
								contact.contactDataEntry.map((data: any, index: any) => 
									<div
										key={`${name}-${index}`}
										className='justify-content-start mt-1'
									>
										<div className='row'>
											<div className='col-3'>
												<FormikControl 
													name={`${path}contactDataEntry[${index}].label`}
													control="selectCreatable"
													options={contactDataTypeOptions}
													label="label"
													type="contactDataEntryLabel"
												/>
											</div>
											<div className='col-7'>
												<FormikControl 
													name={`${path}contactDataEntry[${index}].value`}
													control="input"
													label="contact data"
												/>
											</div>
											{ contact.contactDataEntry.length > 1 ?
												<div className='col-1'>
													<CustomButton
														text="delete"
														onClick={() => arrayHelpers.remove(index)}
														className="mt-4"
													/>
												</div>
												: null
											}
										</div>
									</div>
								) : null
							}
							<div className='row'>
								<div className='col-3'>
									<CustomButton
										text="add contact data"
										onClick={() => arrayHelpers.push(contactDataItemInitialValues)}
										className="mt-2"
									/>
								</div>
							</div>
						</div>
					}
				/>
				<div>
					<FormikControl 
						name={`${path}contactNotes`}
						control="textArea"
						label="notes on contact"
					/>
				</div>
			</div>
		</div>
	);
};

export default ContactCard;

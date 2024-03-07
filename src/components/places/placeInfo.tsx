import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { basicInfoInitialValues } from '../../typesValidationInitialvalues/basicInfoTypes';
import { handleGetPlaceByIdHttpRequest } from '../../services/placesService';
import PlaceInfoRoutes from '../../routes/placeInfoRoutes';


const PlaceInfo = () => {
	const { id } = useParams();

	const [ historyCollapsed, setHistoryCollapsed ] = useState(false);
	const [ historySearch, setHistorySearch ] = useState('');
	const [ selectedPlace, setSelectedPlace ] = useState(basicInfoInitialValues);
	const [ loading, setLoading ] = useState(false) 
	const [ serverError, setServerError ] = useState<any>("")

	useEffect( () => {
		const getPlaceById = async () => {
			if( id === "newPlace" ) { 
				let newInitialBasicInfoValues = basicInfoInitialValues
				newInitialBasicInfoValues._id = "newPlace"
				setSelectedPlace(newInitialBasicInfoValues)
				return
			}
			try{
				setLoading(true)
				const place = await handleGetPlaceByIdHttpRequest(id, setServerError)
				setSelectedPlace(place)
				setLoading(false)
			} catch (error){
				setServerError(error)
			}
		}
		getPlaceById()
	}, [])

	// const filteredHistoryData = selectedPlace.historyData.filter(
	// 	(item: any) =>
	// 		item.label.toLowerCase().includes(historySearch.toLowerCase()) ||
	// 		item.creatDate.toLowerCase().includes(historySearch.toLowerCase())
	// );

	const path = selectedPlace && selectedPlace._id ? `/main/places/${selectedPlace._id}/` : `/main/places/none/`;

	const { basicInfo } = selectedPlace

	const {
		customerNumber,
		name,
		fullAddress,
		addressLocation
	} = basicInfo

	return (
		<div style={{display: "flex"}}>
			<div className='row align-items-start' style={{ position: 'fixed', top: '70px', bottom: '0'}}>
				<div className='col-2 border'>
					<div className='list-group list-group-flush'>
						<img
							className='pt-2 ps-2'
							src='https://i.postimg.cc/MGDkv9H4/Screenshot-2022-12-03-at-21-10-06.png'
							alt={`Location on address ${fullAddress}`}
						/>
						<div className='p-3'>
							<div className='d-flex'>
								<h5>{`${customerNumber} - ${name}`}</h5>
								<Link className='ms-auto' to={`${path}basicInfoEdit`}>
									<ModeEditOutlinedIcon
										sx={{ fontSize: 24 }}
              			color="action"
									/>
								</Link>
							</div>

							<h5>{`${addressLocation.description}`}</h5>
						</div>
						<Link
							to={`${path}basicInfo`}
							className='list-group-item list-group-item-action'
						>
							Basic Information
						</Link>
						<Link
							to={`${path}workplan`}
							className='list-group-item list-group-item-action'
						>
							Workplan
						</Link>
						<Link
							to={`${path}placeTaskManager`}
							className='list-group-item list-group-item-action'
						>
							Property task manager
						</Link>
						<Link
							to={`${path}calendar`}
							className='list-group-item list-group-item-action'
						>
							Calendar
						</Link>
						<Link
							to={`${path}currentContract`}
							className='list-group-item list-group-item-action'
						>
							Current Contract
						</Link>
						<div
							data-bs-toggle='collapse'
							// ref='#collapseExample'
							role='button'
							aria-expanded='false'
							aria-controls='collapseExample'
							className='list-group-item list-group-item-action'
							onClick={() =>
								setHistoryCollapsed(historyCollapsed ? false : true)
							}
						>
							History
						</div>
						<div className='collapse' id='collapseExample'>
							<input
								className='form-control m-1'
								type='search'
								placeholder='Search history'
								value={historySearch}
								onChange={(e) => setHistorySearch(e.target.value)}
							/>
							<div className='overflow-auto'>
								<div className='list-group-flush '>
									{/* {filteredHistoryData.map((item: any) => {
										return (
											<Link
												className='list-group-item list-group-item-action m-1'
												key={item._id}
												to={`${path}historyData`}
											>{`${item.creatDate} - ${item.label}`}</Link>
										);
									})} */}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='col' style={{ maxHeight: 'calc(100vh - 70px)', overflowY: 'auto', marginLeft: '6%' }}>
					<PlaceInfoRoutes place={selectedPlace} loading={loading}/>
				</div>
			</div>
		</div>
	);
};

export default PlaceInfo;

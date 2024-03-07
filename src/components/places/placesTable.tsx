import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Table from '../common/table';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { handleGetPlacesHttpRequest } from '../../services/placesService';

interface SortValuesType {
  path: string;
  order: 'asc' | 'desc';
}

const PlacesTable = () => {
	
	const [searchedValue, setSearchedValue] = useState('');
	const [filteredPlaces, setFilteredPlaces] = useState<any[]>([]);
	const [sortValues, setSortValues] = useState<SortValuesType>({ path: 'name', order: 'asc' });
	const [serverError, setServerError] = useState(null)
	const [places, setPlaces ] = useState([])

	useEffect(() => {
		const getPlaces = async () => {
      try {
        const placesData = await handleGetPlacesHttpRequest(setServerError);
        setFilteredPlaces(placesData);
				setPlaces(placesData)
      } catch (error) {
        // Handle the error appropriately, e.g., set an error state.
        console.error('Error fetching places:', error);
      }
    };
		getPlaces()
	}, [])

	const getFilteredData = (places: any, searchValue: any) => {
		let filtered = places.filter((place: any) => {
		return _.includes(
			place.basicInfo.customerNumber.toLowerCase(),
			searchValue.toLowerCase()
		) ||
		_.includes(place.basicInfo.name.toLowerCase(), searchValue.toLowerCase()
		) ||
		_.includes(place.basicInfo.fullAddress.toLowerCase(), searchValue.toLowerCase());
  });
		const sorted = _.orderBy(filtered, [sortValues.path], [sortValues.order]);
		return sorted;
	};

	const handleSearchChange = (value: any) => {
		setSearchedValue(value)
		const filteredData = getFilteredData(places, value)
		setFilteredPlaces(filteredData)
	}
	
	
	const columns = [
		{
			path: 'customerNumber',
			label: 'Code',
			content: (item: any) => {
				return (
				<Link
					className='lead'
					style={{ textDecoration: 'none', color: 'black' }}
					to={`/main/places/${item._id}/basicInfo`}
				>
					{item.customerNumber}
				</Link>
			)},
		},
		{
			path: 'name',
			label: 'Place name',
		},
		{ path: 'fullAddress', label: 'Address' },
	];

	return (
		<>
			{
				serverError ? 
					<div>{serverError}</div> 
					:
				<div>
					<div
						className='container-fluid p-2 fixed-top bg-light shadow'
						style={{ top: '50px' }}
					>
						<div className='row d-flex justify-content-between align-items-center'>
							<div className='col-4'>
								<div className="row">
									<div className='col-7'>
										<input
											type='search'
											className='form-control ms-2'
											placeholder='Search'
											value={searchedValue}
											onChange={(e) => handleSearchChange(e.target.value)}
											aria-label='Search'
										/>
									</div>
									<div className='col-1 mt-1 ms-1' style={{ cursor: "pointer"}}>
										<Link
											to="/main/places/newPlace/basicInfoEdit"
										>
											<AddBoxOutlinedIcon sx={{ fontSize: 28 }} color='action' />
										</Link>
									</div>
									<div className='col-1 mt-1 cursor-pointer' style={{ cursor: "pointer"}}>
										<TuneOutlinedIcon sx={{ fontSize: 28 }} color='action' />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div style={{ marginTop: '130px' }}>
						<Table
							data={filteredPlaces}
							columns={columns}
							onSort={setSortValues}
							sortColumn={sortValues}
						/>
					</div>
				</div> 
			}
		</>
	);
};

export default PlacesTable;

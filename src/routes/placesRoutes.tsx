import { Route, Routes } from 'react-router-dom';
import PlacesTable from '../components/places/placesTable';
import PlaceInfo from '../components/places/placeInfo';
import NotFound from '../components/common/notFound';

const PlacesRoutes = () => {
	return (
		<Routes>
			<Route index element={<PlacesTable />} />
			<Route path='/:id/*' element={<PlaceInfo />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
};

export default PlacesRoutes;

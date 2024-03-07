import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginRoutes from './loginRoutes';
import MainRoutes from './mainRoutes';



const RootRoutes = () => {
  return ( 
    <BrowserRouter>
      <Routes>
		  	<Route path="/*" element={<LoginRoutes />} />
        <Route path="/main/*" element={<MainRoutes />} />
		  </Routes>  
    </BrowserRouter>
   );
}
 
export default RootRoutes;
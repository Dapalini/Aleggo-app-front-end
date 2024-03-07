import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../components/mainLayout/mainLayout';
import Home from '../components/home/home';
import Todo from '../components/home/todo';
import Overview from '../components/home/overview';
import Calendar from '../components/home/calendar';
import NotFound from '../components/notFound';
import { verifyAuthHttpRequest } from '../services/authService';
import AccessDenied from '../components/login/accessDenied';
import PlacesRoutes from './placesRoutes';
import BasicInfoTestFormikContext from '../components/places/basicInfo/basicInfoTestFormikContext';

const MainRoutes = () => {
  const [isAuthorized, setAuthorized] = useState({role: "unVeted"})

  useEffect( () => {
    const checkAuth = async () => {
      const auth = await verifyAuthHttpRequest()
      setAuthorized(auth)
    }
    checkAuth()
  },[])

  return ( 
    <Routes>
      { isAuthorized.role === "operationsAdmin" 
        || isAuthorized.role === "economyAdmin"  
        || isAuthorized.role === "superAdmin" ? 
        <Route path='/' element={<MainLayout  />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />}>
            <Route index element={<Overview />} />
            <Route path='overview' element={<Overview />} />
            <Route path='todo' element={<Todo />} />
            <Route path='calendar' element={<Calendar />} />
          </Route>
          <Route path='places/*' element={<PlacesRoutes />} />
          <Route path='*' element={<NotFound />} />
          <Route path="test" element={<BasicInfoTestFormikContext/>}/>
        </Route>
        : <Route path="/*" element={<AccessDenied />}/>
      }
    </Routes>
   );
}
 
export default MainRoutes;
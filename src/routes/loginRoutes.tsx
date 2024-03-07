import { Routes, Route } from 'react-router-dom';
import Auth from '../components/login/auth';
import SignupRequested from "../components/login/signupInfo"
import { AuthContextProvider } from '../contexts/authContext';
import SignupInProgress from '../components/login/signupInProgress';

const LoginRoutes = () => {
  return ( 
    <Routes>
      <Route path='/' element={
        <AuthContextProvider>
          <Auth />
        </AuthContextProvider>
      }/>
      <Route path="/signupInfo" element={
        <SignupRequested/>
      }/>
      <Route path="/signupInProgress" element={
        <SignupInProgress/>
      }/>
    </Routes>
   );
}
 
export default LoginRoutes;
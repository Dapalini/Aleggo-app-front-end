import Signup from './signup';
import Login from './login';
import { LoginContextProvider } from '../../contexts/loginContext';
import { SignupContextProvider } from '../../contexts/signupContext';
import { useAuth } from '../../contexts/authContext';
import CenterBox from '../common/centerBox';

const Auth = () => {

	const {state} = useAuth()
	const { authMode } = state

	return (
		<CenterBox>
			{ authMode === "login" ?
				<LoginContextProvider>
					<Login/> 
				</LoginContextProvider>
				:
				<SignupContextProvider>
					<Signup/>
				</SignupContextProvider>
			}
		</CenterBox>
  )
}
  
export default Auth;
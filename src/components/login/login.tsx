import { Form } from 'formik';
import FormikControl from '../formikControl/formikControl';
import { useAuth } from '../../contexts/authContext';
import { useLogin } from '../../contexts/loginContext';
import { useFormikContext } from 'formik';

const Login = () => {

	const { handleReset } = useFormikContext()

	const { changeAuthMode } = useAuth()
	
	const { setPasswordVisible, state } = useLogin()
	const { passwordVisible, serverError } = state

	const handleAuthModeChange = () => {
		handleReset()
		changeAuthMode("login")
	}
	
	return (
		<div className="col">
			<div className="d-flex justify-content-center">
				<h4>Aleggo Login</h4>
			</div>
			<div className="d-flex justify-content-center">
				<p>{`If you want to be registered as a user click `}
					<span 
						style={{
							color: "blue", 
							textDecoration: "underline",
							cursor: "pointer"
						}}
						onClick={() => handleAuthModeChange()}
					>
						here
					</span>
				</p>
			</div>
			<Form>
				<div className="d-grid gap-2">
					<FormikControl 
						control="input"
						type="email"
						name="email"
						label="E-mail"
					/>
					<FormikControl 
						control="password"
						name="password"
						label="Password"
						passwordVisibleCheckBox
						setPasswordVisible={setPasswordVisible}
						passwordVisible={passwordVisible}
					/>
					{ serverError ? 
						<div 
							className="alert alert-danger" role="alert"
						>
							{ serverError.map((error: string ) => {
								return(
									<div key={error}>
										<p>{error}</p>
									</div>
								)
							})}
						</div> 
						: null
					}
					<FormikControl 
						control="submitButton"
						text="Log in"
					/>
				</div>	
			</Form>
		</div>
	)
};

export default Login;
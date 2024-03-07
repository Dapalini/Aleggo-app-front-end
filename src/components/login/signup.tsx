import { Form } from 'formik';
import FormikControl from '../formikControl/formikControl';
import { useAuth } from '../../contexts/authContext';
import { useSignup } from "../../contexts/signupContext"
import { useFormikContext } from 'formik';

const Signup = () => {
	
	const { handleReset } = useFormikContext()

	const { changeAuthMode } = useAuth()

	const { setPasswordVisible, state } = useSignup()
	const { passwordVisible, serverError } = state

	const handleAuthModeChange = () => {
		handleReset()
		changeAuthMode("signup")
	}

	return (
		<div className="col">
			<div className="d-flex justify-content-center">
				<h4>Aleggo Signup</h4>
			</div>
			<div className="d-flex justify-content-center">
				<p>{`If you need to login click `}
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
						type="input"
						name="name"
						label="Name"
					/>
					<FormikControl 
						control="input"
						type="email"
						name="email"
						label="E-mail"
					/>
					<FormikControl 
						control="input"
						type="input"
						name="company"
						label="Company"
					/>
					<FormikControl 
						control="password"
						name="passwordConfirm1"
						label="Password"
						passwordVisible={passwordVisible}
						passwordVisibleCheckBox={false}
					/>
					<FormikControl 
						control="password"
						name="passwordConfirm"
						label="Confirm password"
						passwordVisibleCheckBox
						passwordVisible={passwordVisible}
						setPasswordVisible={setPasswordVisible}
					/>
					<FormikControl 
						control="textArea"
						name="signupNotes"
						placeholder="example: I am a cleaner working with CleanMax"
						label="Any remarks to admininstrator regarding the signup"
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
						text="Request approval"
					/>
				</div>	
			</Form>
		</div>
	);
};

export default Signup;
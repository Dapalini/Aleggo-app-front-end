import CenterBox from '../common/centerBox';

const SignupRequested = () => {
  return (
    <CenterBox>
      <div>
        <div className="d-flex justify-content-center mb-3">
          <h4>Aleggo Signup</h4>
        </div>
        <div className='row m-1'>
          <div className="alert alert-success mb-3" role="alert">
            Thank you for your signup request
          </div>
        </div>
        <div className='row'>
          <p>
            The request has been submitted to the system administrator, and if approved you can log in.
          </p>
        </div>
      </div>
    </CenterBox>
   );
}
 
export default SignupRequested;
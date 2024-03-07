import * as React from 'react';
import CenterBox from '../common/centerBox';

const SignupInProgress = () => {
  return (
    <CenterBox>
      <div>
        <div className="d-flex justify-content-center mb-3">
          <h4>Aleggo Signup</h4>
        </div>
        <div className='row m-1'>
          <div className="alert alert-danger mb-3" role="alert">
            Your signup is not yet approved
          </div>
        </div>
        <div className='row'>
          <p>
            The request has been submitted to the system administrator, and you need to get approval before you can log in.
          </p>
        </div>
      </div>
    </CenterBox>
   );
}
 
export default SignupInProgress;
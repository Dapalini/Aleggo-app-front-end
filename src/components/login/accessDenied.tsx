import CenterBox from '../common/centerBox';
import CustomButton from '../common/customButton';
import { useNavigate } from "react-router-dom"

const AccessDenied = () => {

  const navigate = useNavigate()

  return (
    <CenterBox>
      <div>
        <div className="d-flex justify-content-center mb-3">
          <h4>Aleggo Alert</h4>
        </div>
        <div className='row m-1'>
          <div className="alert alert-danger mb-3" role="alert">
            You do not have access to this page
          </div>
        </div>
        <div className='row'>
          <p>
            Please either login with an authorized email, or return to previous page.
          </p>
        </div>
        <div className="row d-flex justify-content-between m-1">
          <CustomButton 
            className="col-5"
            text="Return"
            action={() => navigate(-1)}
          />
          <CustomButton
            className="col-5"
            text="Login again"
            action={() => navigate("/")}
          />
        </div>
      </div>
    </CenterBox>
   );
}
 
export default AccessDenied;
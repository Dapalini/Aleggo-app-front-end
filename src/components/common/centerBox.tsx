import { Children } from "../../typesValidationInitialvalues/general";

const CenterBox = ({children}: Children) => {
	
	return (
		<>
			<div className="container d-flex justify-content-center">
				<div style={{top: "200px"}} className="w-25 position-absolute shadow p-4 border rounded ">
					{children}
				</div>
			</div>	
		</>
  )
  }
  
 export default CenterBox;
import config from "../config/default.json"
import httpServices from "../services/httpServices";

const apiEndPoint = `${config.apiEndPoint}`

export const handleGetPlacesHttpRequest = async (setServerError: any) => {
  try {
    const response = await httpServices.get(`${apiEndPoint}/places/`);
    if (response.status === 200) {
      const responseData = response.data
      return responseData;
    }
  } catch (errors: any) {
    if(errors?.code === "ERR_NETWORK"){
      const serverErrors = {message: errors.message + ". There seems to be a problem with the network or server."}
      setServerError(serverErrors)
      return  
    }
    const serverErrors = errors.response?.data
    setServerError(serverErrors)
    return
  }
}

export const handleGetPlaceByIdHttpRequest = async (placeId: any, setServerError: any) => {
  try {
    // Make a GET request to the server to fetch a place by its ID
    const response = await httpServices.get(`${apiEndPoint}/places/${placeId}`);

    if (response.status === 200) {
      const responseData = response.data;
      console.log(responseData, "At service")
      return responseData;
    }
  } catch (error: any) {
    if (error?.code === 'ERR_NETWORK') {
      const serverErrors = {
        message: error.message + '. There seems to be a problem with the network or server.',
      };
      setServerError(serverErrors);
      return;
    }

    const serverErrors = error.response?.data;
    setServerError(serverErrors);
    return;
  }
};

export const handlePostPlaceHttpRequest = async (newPlaceData: any, setServerError: any) => {
  try {
    // Make a POST request to the server to add a new place
    const response = await httpServices.post(`${apiEndPoint}/places/`, newPlaceData);

    if (response.status === 200) {
      const responseData = response.data;
      return responseData;
    }
  } catch (error: any) {
    if (error?.code === 'ERR_NETWORK') {
      const serverErrors = {
        message: error.message + '. There seems to be a problem with the network or server.',
      };
      setServerError(serverErrors);
      return;
    }

    const serverErrors = error.response?.data;
    console.log(error);
    setServerError(serverErrors);
    return;
  }
};

export const handlePatchPlaceByIdHttpRequest = async (placeId: any, updatedFields: any, setServerError: any) => {
  try {
    // Make a PATCH request to the server to update a place by its ID
    const response = await httpServices.patch(`${apiEndPoint}/places/${placeId}`, updatedFields);

    if (response.status === 200) {
      const responseData = response.data;
      return responseData;
    }
  } catch (error: any) {
    if (error?.code === 'ERR_NETWORK') {
      const serverErrors = {
        message: error.message + '. There seems to be a problem with the network or server.',
      };
      setServerError(serverErrors);
      return;
    }

    const serverErrors = error.response?.data;
    console.log(error);
    setServerError(serverErrors);
    return;
  }
};

export const handleDeletePlaceByIdHttpRequest = async (placeId: any, setServerError: any) => {
  try {
    // Make a DELETE request to the server to delete a place by its ID
    const response = await httpServices.delete(`${apiEndPoint}/places/${placeId}`);

    if (response.status === 200) {
      return 'Place deleted successfully';
    }
  } catch (error: any) {
    if (error?.code === 'ERR_NETWORK') {
      const serverErrors = {
        message: error.message + '. There seems to be a problem with the network or server.',
      };
      setServerError(serverErrors);
      return;
    }

    const serverErrors = error.response?.data;
    console.log(error);
    setServerError(serverErrors);
    return;
  }
};
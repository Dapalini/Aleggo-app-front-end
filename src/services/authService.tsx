import config from "../config/default.json"
import httpServices from "../services/httpServices";

const apiEndPoint = `${config.apiEndPoint}`

export const handleSignupHttpRequest = async (setServerError: any, user: any) => {
  const {
    name,
    company,
    email,
    passwordConfirm: password,
    signupNotes
  } = user
  
  try {
    const response = await httpServices.post(`${apiEndPoint}/users/`, {
      name,
      email,
      company,
      password,
      signupNotes  
    });
    if (response.status === 200) {
      console.log(response)
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
    console.log(errors)
    setServerError(serverErrors)
    return
  }
}

export const handleLoginHttpRequest = async (setServerError: any, user: any) => {
  const {
    email,
    password,
  } = user

  try {
    const response = await httpServices.post(`${apiEndPoint}/auth/`, {
      email,
      password,
    });
    if (response.status === 200) {
      const loginResponseData = response.data
      return loginResponseData
      // Here you can store the user's authentication token or set a logged-in state in your app.
    } else {
      // Login failed
      console.log('Login failed');
    }
    } catch (error: any) {
      const errorMessage = error.response?.data
      setServerError(errorMessage)
    }
  };

export const verifyAuthHttpRequest = async () => {
  return {role: "operationsAdmin"}
};

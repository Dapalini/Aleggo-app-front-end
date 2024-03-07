import Axios from 'axios';

const httpServices = {
	get: Axios.get,
	post: Axios.post,
	put: Axios.put,
	delete: Axios.delete,
	patch: Axios.patch
};

export default httpServices;

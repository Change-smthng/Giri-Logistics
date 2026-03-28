const API_FROM_ENV = process.env.REACT_APP_API;

const API_FALLBACK =
	window.location.hostname === 'localhost'
		? 'http://localhost:5000'
		: 'https://giri-logistics-backend.onrender.com';

export const API = API_FROM_ENV || API_FALLBACK;
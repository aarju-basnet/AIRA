import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URI,
  withCredentials: true
})


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});



API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default API


























//use of Axios
//send request , hadles JSON, use Interceptors

//USe of Interceptors
// It is like a gatekeeper, perfect place to modify request, attach token, add headers 

//withcredintals:true allwos to send cookies for every request
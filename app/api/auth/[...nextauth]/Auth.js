import axios from '../../../lib/axios/Axios';


class Auth{
    getErrorMessage = (statusCode, type, message) => {
         return {statusCode,type,message}
     }
     getAccessToken = async (endPoint, refreshToken) => {
         try {
             const rs = await axios.post(endPoint, {
                 refreshToken
             });
             return rs.data?.accessToken;
         } catch (error) {
             return null;
         }
     }
     sendPostRequest = async (endpoint, data = {}) => {
        try {
            const res = await axios.post(endpoint, data)
            const user = res?.data?.data
            return user;
        } catch (error) {
            throw new Error(error?.response?.status)
        }
    }
 
}
export default new Auth();

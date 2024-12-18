import axios from "@/app/lib/axios/Axios";
export const sendLogoThroughEmail = async (data, userId) => {
    try {
      let result = await axios.post(`/v1/${userId}/dashboard/logo_through_email`, data);

      return result?.data;
    } catch (error) {
      throw error;
    }
  };
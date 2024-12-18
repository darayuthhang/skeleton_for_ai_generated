import axios from "@/app/lib/axios/Axios";
export const unSub = async (data, userId) => {
  try {
    let result = await axios.post(`/v1/${userId}/unsub`, data);
    return result?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const createPrompt = async (data, userId) => {
  try {
    let result = await axios.post(`/v1/${userId}/dashboard/prompt`, data);

    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const createNewPrompts = async (data, userId) => {
  try {
    let result = await axios.post(`/v1/${userId}/dashboard/newprompt`, data);

    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const createRegenerate = async (data, userId) => {
  try {
    let result = await axios.post(`/v1/${userId}/dashboard/regenerate`, data);

    return result?.data;
  } catch (error) {
    throw error;
  }
};

export const createCollectData = async (data, userId) => {
  try {
    let result = await axios.post(`/v1/${userId}/dashboard/collect_data`, data);

    return result?.data;
  } catch (error) {
    throw error;
  }
};
export const uploadLogo = async (data, userId) => {
  try {
    let result = await axios.post(`/v1/${userId}/dashboard/upload`, data);

    return result?.data;
  } catch (error) {
    throw error;
  }
};
export const createPrivateImage = async (data, userId) => {
  try {
    let result = await axios.post(`/v1/${userId}/dashboard/permission`, data);

    return result?.data;
  } catch (error) {
    throw error;
  }
};


export const getInngest = async (eventId, userId) => {
    try {
      let result = await axios.get(`/v1/${userId}/dashboard/${eventId}/inngest`);
  
      return result?.data;
    } catch (error) {
      throw error;
    }
  };
  
// export const getImageList = async (userId) => {
//   try {
//     let result = await axios.get(`/v1/${userId}/dashboard/imageList`);

//     return result?.data?.data;
//   } catch (error) {
//     throw error;
//   }
// };
export async function getRunInngest(eventId) {
    const response = await fetch(`https://api.inngest.com/v1/events/${eventId}/runs`, {
      headers: {
        Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
      },
    });
    const json = await response.json();
    return json.data;
  }

  export const sendFeedBackApi = async (data, userId) => {
    try {
      let result = await axios.post(`/v1/${userId}/dashboard/feedback`, data);

      return result?.data;
    } catch (error) {
      throw error;
    }
  };

  export const getImageListUrlForDownload = async (data, userId) => {
    try {
      let result = await axios.post(`/v1/${userId}/dashboard/download`, data);

      return result?.data;
    } catch (error) {
      throw error;
    }
  };
// export async function getRunOutput(eventId) {
//   async function getRuns(eventId) {
//     try {
//       const response = await fetch(
//         `https://api.inngest.com/v1/events/${eventId}/runs`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
//           },
//         }
//       );
//       const json = await response.json();
//       return json.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   let runs = await getRuns(eventId);
//   while (runs[0]?.status !== "Completed") {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     runs = await getRuns(eventId);
//     if (runs[0]?.status === "Failed" || runs[0]?.status === "Cancelled") {
//       throw new Error(`Function run ${runs[0]?.status}`);
//     }
//   }
//   return runs[0];
// }

import axios from "axios";

const baseURL = "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL,
});

export const getUserProfile = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosInstance.get("/profile/user", config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.msg)
      throw new Error(error.response.data.msg);
    throw error;
  }
};

export const updateUserProfile = async (token, values) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosInstance.put("/profile/edit", values, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.msg)
      throw new Error(error.response.data.msg);
    throw error;
  }
};

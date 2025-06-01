import axios from "axios";

const API_URL = "http://13.49.245.175:8080/api/v1/auth/signin"; // Replace with your login API URL
export interface dataType {
  phone: string;
  password: string;
}
export const loginUser = async (data: dataType) => {
  const response = await axios.post(API_URL, data);
  return response.data; // Assuming the response has user data
};

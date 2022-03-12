import axios from "axios";
const baseUrl =
  "https://twitter-square-boat.herokuapp.com" || "http://localhost:5000";

const post = async (url, params, data, token) => {
  try {
    let res = await axios({
      url: baseUrl + url,
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      params: params || {},
      data: data || {},
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export default post;

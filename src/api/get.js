import axios from "axios";

const baseUrl = "http://localhost:5000";

const get = async (url, params, token) => {
  try {
    let res = await axios({
      url: baseUrl + url,
      headers: { Authorization: `Bearer ${token}` },
      params: params || {},
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export default get;

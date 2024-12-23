import axios from "axios";
import cookie from "react-cookies";

const request = () => {
  const token = cookie.load("token");
  const headers = token === "null" ? {} : { Authorization: `Bearer ${token}` };

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_END_URL,
    headers,
  });
};

class Axios {
  constructor() {}

  async post(url, body) {
    return await request().post(url, body);
  }

  async get(url) {
    return await request().get(url);
  }

  async patch(url, body) {
    return await request().patch(url, body);
  }

  async put(url, body) {
    return await request().put(url, body);
  }

  async delete(url) {
    return await request().delete(url);
  }
}

const methods = new Axios();

export default methods;

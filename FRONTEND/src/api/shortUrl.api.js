import axios from "axios";

export const createShortUrlApi = async (url) => {
  const { data } = await axios.post("http://localhost:3000/api/create", {
    url,
  });
  return data;
};

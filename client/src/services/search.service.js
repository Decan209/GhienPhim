import axios from "axios";

export const getSearch = async (query) => {
    console.log("query",query)
    const res = await axios.get(`${process.env.HOST}/api/v1/feature/search?q=${query}`);
    return res.data.data;
  };
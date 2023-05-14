import axios from "axios";

export const getActionMovie = async (page) => {
  const res = await axios.get(`${process.env.HOST}/api/v1/youtubeMovie/getActionMovie/?page=${page.nextPage}&${page.filter}`);
  return res.data.data;
};


export const getFilmViet = async (page) => {
  const res = await axios.get(`${process.env.HOST}/api/v1/youtubeMovie/getFilmViet/?page=${page.nextPage}&${page.filter}`);
  return res.data.data;
};


export const getComedyMovie = async (page) => {
  const res = await axios.get(`${process.env.HOST}/api/v1/youtubeMovie/getComedyMovie/?page=${page.nextPage}&${page.filter}`);
  return res.data.data;
};


export const getCartonMovie = async (page) => {
  const res = await axios.get(`${process.env.HOST}/api/v1/youtubeMovie/getCartonMovie/?page=${page.nextPage}&${page.filter}`);
  return res.data.data;
};


export const getSingleMovie = async (page) => {
  const res = await axios.get(`${process.env.HOST}/api/v1/youtubeMovie/getSingleMovie/?page=${page.nextPage}&${page.filter}`);
  return res.data.data;
};
import axios from "axios";

export const hotMoviesService = async () => {
  const res = await axios.get(`${process.env.HOST}/api/v1/youtubeMovie/hotMovies`);
  return res.data.data;
};

export const newSingleMoiveService = async () => {
  const res = await axios.get(`${process.env.HOST}/api/v1/youtubeMovie/newSingleMoive`);
  return res.data.data;
};

export const newSeriesMoiveService = async () => {
  const res = await axios.get(`${process.env.HOST}/api/v1/youtubeMovie/newSeriesMoive`);
  return res.data.data;
};

export const trenddingMovie = async () => {
  const res = await axios.get(`${process.env.HOST}/api/v1/youtubeMovie/getTrendingMovie`);
  return res.data.data;
};



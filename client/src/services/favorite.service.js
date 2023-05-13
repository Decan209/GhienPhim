import axios from "axios";

export const addFavorite = async(infoMovie)=>{
    const res = await axios.post(`${process.env.HOST}/api/v1/feature/favouriteMovie`,infoMovie);
    return res;
}

export const getFavouriteMovie = async(email)=>{
    const res = await axios.get(`${process.env.HOST}/api/v1/feature/getFavourite/${email}`);
    return res.data.favourite[0];
}

export const deleteFavouriteMovie = async(infoMovie)=>{
    const res = await axios.post(`${process.env.HOST}/api/v1/feature/deleteFavouriteMovie`,infoMovie);
    return res;
}
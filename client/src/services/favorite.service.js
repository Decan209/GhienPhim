import axios from "axios";

export const addFavorite = async({email,idMovie})=>{
    const res = await axios.post(`${process.env.HOST}/api/v1/feature/favouriteMovie`,{email,idMovie});
    return res;
}

export const getFavouriteMovie = async(email)=>{
    const res = await axios.get(`${process.env.HOST}/api/v1/feature/getFavourite/${email}`);
    return res;
}
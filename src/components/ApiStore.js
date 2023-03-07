// const { createContext } = require("react");
import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

 export let TrendingMovies=createContext(0);
 export function TrendingMoviesProvider(props){
    let [trendingmovies, setTrendingMovies] = useState([]);
    let [trendingTvshows, setTrendingTvshows] = useState([]);
    let [trendingPeople, setTrendingPeople] = useState([]);
    let baseImUrl = "https://image.tmdb.org/t/p/original/";
    async function getTrendingItems(mediaType,callback) {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=4615411b3dc6b9e15d51326e386a434c`
      );
      callback(data.results);
    }
    useEffect(() => {    
        getTrendingItems("movie",setTrendingMovies);
        getTrendingItems("tv",setTrendingTvshows);
        getTrendingItems("person",setTrendingPeople);
      }, []); 



    return<>
    <TrendingMovies.Provider 
    value={{trendingmovies,trendingTvshows,trendingPeople,baseImUrl}}>
    {props.children}
    </TrendingMovies.Provider>
    </>
 }


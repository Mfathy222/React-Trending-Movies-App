
import {useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";



export default function Details() {
 let[ searchparams,setSearchParams]=useSearchParams();
  let currentId=searchparams.get('id');
  let [details,setDetails]=useState({});
  let baseImUrl = "https://image.tmdb.org/t/p/original/";


  async function getTrendingDetails(mediaType,callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${currentId}?api_key=4615411b3dc6b9e15d51326e386a434c`
    );
    callback(data);
  }

  useEffect(() => {
    getTrendingDetails("movie",setDetails);
    getTrendingDetails("tv",setDetails);
    getTrendingDetails("person",setDetails);

  }, []);
  
  const voteAverage=details.vote_average;
  const voteCount=details.vote_count;
  const releasedate=details.release_date;
  return (
<>
<div className='row'>
<div className='col-md-4'>
{ 
details.profile_path?<img className="w-100 mb-5 "src={baseImUrl + details.profile_path} alt=""/>:
<img className="w-100 mb-5 "src={baseImUrl + details.poster_path} alt=""/>}

{/* <img className="w-100 mb-5 "src={baseImUrl + details.profile_path} alt=""/> */}
{/* <img className="w-100 mb-5 "src={baseImUrl + details.poster_path} alt=""/> */}
</div>
<div className='col-md-8 m-auto'>
<h2 className="my-3" >{details.title}</h2>
<h2 className="my-3" >{details.name}</h2>

{voteAverage?<h4 className="my-3" >vote_average:{details.vote_average}</h4>:
<h4 className="my-3" >department:{details.known_for_department}</h4>}
{voteCount?<h4 className="my-3" >vote_count:{details.vote_count}</h4>:''}
<h4 className="my-3" >popularity:{details.popularity}</h4>
{releasedate?<h4 className="my-3" >release_date:{details.release_date}</h4>:''}
<p  className="my-5 text-muted">{details.overview}</p>
</div>
</div>
</>
    )
}

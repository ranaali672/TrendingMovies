import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
  let {id,mediaType}=useParams();
  const [details ,setDetails] =useState({});
  

  async function getTrending(id,mediaType){
    let {data} =await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=a502c62b910fcdff6fba44312f25621d&language=en-US`);
    setDetails(data);
    console.log(data);
  }

  useEffect(()=>{
    getTrending(id,mediaType);
   
  },[])
  return<>
  <div className='row'>
    <div className="col-md-3">
    {details.poster_path?<img src={'https://image.tmdb.org/t/p/w500'+ details.poster_path} className="w-100 my-4" alt=" MovieImage" />:<img src={'https://image.tmdb.org/t/p/w500'+ details.profile_path} className="w-100 my-4" alt=" MovieImage" />}

    </div>
    <div className="col-md-9 d-flex align-items-center justify-content-center">
      
      <div className=''>
      
           <h2 className="text-info">{details.title} {details.name}</h2>
        
           <p className='text-muted my-3 fs-6'>{details.overview} {details.biography}</p>
           {details.vote_average? <h5>Vote Average :  <span className='btn btn-info fs-6 px-2 py-1'>{details.vote_average.toFixed(2)}</span> </h5>:""}
           {details.vote_count? <h5>Vote Count : <span className='btn btn-info fs-6 px-2 py-1'>{details.vote_count} </span> </h5>:""}
           {details.known_for_department?<h5 className="text-white"> Department : <span className='btn btn-info'>{details.known_for_department}</span> </h5> :""}
           
          
           
      </div>
 
    </div>
  </div>
  </>
    
  
}

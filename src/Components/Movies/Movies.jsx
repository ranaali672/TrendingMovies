import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


export default function Movies() {
  const [movies ,setMovies] =useState([]);
  let mediaType='movie';
  let nums =new Array(20).fill(1).map((ele,index)=>index+1);
  console.log(nums);

  
  async function getTrending(page){
    let {data} =await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a502c62b910fcdff6fba44312f25621d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`);
    setMovies(data.results);
    console.log(data.results);
  }

  useEffect(()=>{
    getTrending(1);
   
  },[])
  return <>
  {movies[0] ? <>
  </>:
  <div className='d-flex vh-100 align-items-center justify-content-center'>
  <i className='fas fa-spinner fa-spin fa-8x'></i>
  </div>}
  <div className='row'>
    {movies.map((item,index)=> <div key={index} className="col-md-3">
    <Link className="text-decoration-none text-white" to={`/moviedetails/${item.id}/${mediaType}`}>
       
       <div className="position-relative">
           <img src={'https://image.tmdb.org/t/p/w500'+ item.poster_path} className="w-100" alt=" MovieImage" />
          
          <h3 className="h5">{item.title}</h3>
          <div className="vote position-absolute top-0 end-0 p-1"> {item.vote_average.toFixed(1)}</div>
          
       
       </div>
     </Link>
    </div>)}
  </div>
  <nav className='py-5'>
    <ul className='pagination pagination-sm d-flex justify-content-center'>
      {nums.map((page)=>
         <li key={page} onClick={()=>getTrending(page)} className='page-item p-1'>
        <Link className='page-link bg-transparent text-white'>{page}</Link>
     
      </li>
      )}
     
    </ul>
  </nav>
  </>
    
  
}

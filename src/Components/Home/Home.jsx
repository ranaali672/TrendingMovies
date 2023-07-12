import axios from 'axios';
import React, { useEffect, useState } from 'react'
import  Mediatem from '../Mediatem/Mediatem'

export default function Home() {
  
  const [movies ,setMovies] =useState([]);
  const [tv ,setTv] =useState([]);
  const [people ,setPeople] =useState([]);
  

  async function getTrending(mediaitem,callback){
    let {data} =await axios.get(`https://api.themoviedb.org/3/trending/${mediaitem}/week?api_key=a502c62b910fcdff6fba44312f25621d`);
    callback(data.results);
    console.log(data.results);
  }

  useEffect(()=>{
    getTrending('movie',setMovies);
    getTrending('tv',setTv);
    getTrending('person',setPeople);
  },[])
  return<>
  {movies[0]?<>
    <div className="row py-4">
    <div className="col-md-4 d-flex align-items-center">
      <div>
        <div className='brdr w-25 mb-3'></div>
        <h2 className='h3'> Trending <br /> Movies <br /> To watch Now</h2>
        <p className='text-muted'> Most Watched Movies By Week</p>
        <div className='brdr w-100 mt-3'></div>
      </div>
    </div>
    {movies.slice(0,10).map((item,index)=> <Mediatem key={index} item={item}/>)}
    </div>
    <div className="row py-4">
    <div className="col-md-4 d-flex align-items-center">
      <div>
        <div className='brdr w-25 mb-3'></div>
        <h2 className='h3'> Trending <br /> tv <br /> To watch Now</h2>
        <p className='text-muted'> Most Watched tv By Week</p>
        <div className='brdr w-100 mt-3'></div>
      </div>
    </div>
    {tv.slice(0,10).map((item,index)=> <Mediatem key={index} item={item}/>)}
    </div>
    <div className="row py-4">
    <div className="col-md-4 d-flex align-items-center">
      <div>
        <div className='brdr w-25 mb-3'></div>
        <h2 className='h3'> Trending <br /> people <br /> To watch Now</h2>
        <p className='text-muted'> Most Watched people By Week</p>
        <div className='brdr w-100 mt-3'></div>
      </div>
    </div>
    {people.slice(0,10).map((item,index)=> <Mediatem key={index} item={item}/>)}
    </div>
    </> :<div className='d-flex vh-100 align-items-center justify-content-center'>
      <i className='fas fa-spinner fa-spin fa-8x'></i>
      </div>}

   </> 
}

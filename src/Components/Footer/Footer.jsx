import React from 'react'
// import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='foo py-1 fixed-bottom text-center '>
<div className="container">
  
    
      <div className="footer-cont d-flex align-items-center justify-content-center">
        {/* <Link className='fab mx-4' to='../Home' >Home</Link>
        <Link className=' fab mx-4' to='../Movies'>Movies</Link>
        <Link className=' fab mx-4' to='../Tvshow'>TV Show</Link>
        <Link className=' fab mx-4' to='../People'>People</Link> */}
                 <i className='fab mx-3 fa-facebook'></i>
                <i className='fab mx-3 fa-twitter'></i>
                <i className='fab mx-3 fa-instagram'></i>
                <i className='fab mx-3 fa-soundcloud'></i>
      
        
    
  </div>
</div>




    </footer>
    )
}

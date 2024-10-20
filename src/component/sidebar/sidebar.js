import React, { Component, useEffect, useState } from 'react';
import { Outlet, Link,useLocation } from 'react-router-dom';
import './sidepanel.css'
import axios from 'axios';


export default function Sidepanel(){
    const location = useLocation()
   const [Episode,setEpisode]=useState([])

   useEffect(()=>{
    getallEpisode()
    Episode.map((item)=>{
        console.log('pathname',location.pathname)
        console.log('current',`/character/${item.id}`)

    })
   },[])
  const getallEpisode = () => {
    axios.get('https://rickandmortyapi.com/api/episode')
        .then((res) => {
            setEpisode(res.data.results)
        }).catch((err) => {
            console.log("err", err)
        })
}
    return (
        <main>
            <div >
                <aside className={`sidebar`}>
                    <nav className='nav'>
                        <div>
                            <div style={{
                                fontWeight: '600',
                                fontSize: '22px',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>Episodes</div>



                        </div>
                        <div className='navList'>
                            {
                                Episode.map((item,ind) => (

                                    <div key={ind} className={location.pathname == `/character/${item.id}`?'selectedNav':'ChildNavBox'} >
                                        <Link   style={{
                                            textDecoration: 'none',
                                            color: 'black'
                                        }} to={`/character/${item.id}`}>
                                            <div className='navChild'>{item.name}</div>

                                        </Link>
                                    </div>
                                ))
                            }
                        </div>


                    </nav>
                </aside>

                <div>

                    <Outlet />


                </div>
            </div>

        </main>
    )
}


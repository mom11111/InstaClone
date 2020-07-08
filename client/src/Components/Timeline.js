import React from 'react'
import '../styles/timeline.css'
import { FaComment, FaHeart } from 'react-icons/fa';
export default function Timeline() {
    const myuser = JSON.parse(sessionStorage.getItem('myuser'))
    console.log(myuser);
    return (
        <div>
           { 
             myuser[3].map((user,index)=>{
                 return( 
                     <div key={index} className="postOn">
                     <p>{user._id}</p>
                     <p>{user.title}</p>
                     <img src={user.image} alt="picture" className="postImage" />
                     <ul>
                         <li><FaHeart  /></li>
                         <li><FaComment /></li>
                     </ul>
                     <br />
                     <p>{user.caption}</p>
                     </div>

                 )

             })
           }
        </div>
        
       
    )
}

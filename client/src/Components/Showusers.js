import React from 'react'
import Axios from 'axios';
import '../styles/showuser.css'
export default function Showusers({user}) {
    let myuser =JSON.parse(sessionStorage.getItem('myuser'));
    const handleclick =id=>e=>{
        e.preventDefault();
        let body = {
            follower:myuser._id,
            following:id
        }
        console.log(body);
        Axios.post('/follow', body).then(res=>{
            console.log(res);
        })
    }
    return (
        <div>
           {
             user.map((use,index)=>{
                 return(
                     <div key={index} className="follow">
                     <p>{use.name}</p>
                     <p>{use._id}</p>
                     <button onClick={handleclick(use._id)} className="button3">follow</button>
                     </div>
                 )
             })
           } 
        </div>
    )
}

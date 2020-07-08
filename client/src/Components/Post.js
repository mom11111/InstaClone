import React,{useState} from 'react'
import Axios from 'axios';
import '../styles/post.css'
import Showusers from './Showusers'
import Timeline from './Timeline'
export default function Post() {
    const[title, settitle] = useState('');
    const [image, setimage] = useState('');
    const [caption, setcaption] = useState('');
    const [user, setuser] = useState([{}]);
    let myuser =JSON.parse(sessionStorage.getItem('myuser'));
    console.log(myuser);;
    const handlesubmit = (e)=>{
        e.preventDefault();
        let body = {
            title,
            image,
            caption,
            postedBy:myuser._id
        }
        Axios.post('/post', body).then(post=>{
            console.log(post);
        }).catch(err=>{
            console.log(err);
        })
    }

    const handleclick = (e)=>{
        e.preventDefault();
        let body ={
            follower:myuser[0]._id
        }
        Axios.post('/getusers', body ).then(users=>{
           console.log(users.data);
           setuser(users.data);
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="post">
        <div className="row">
        <div className="col-12 col-md-6 col-lg-3 col-xl-3 left">
        <img src="https://res.cloudinary.com/nishantsunny/image/upload/v1587282959/sample.jpg"  className="profilepic"/>
        <ul className="profileInfo">
          <li><button>{myuser[0].name}</button></li>
          <li><button className="followers">followers:{myuser[2]}</button></li>
           <li><button className="follwers">following:{myuser[1]}</button></li>
        </ul>
        <h3>Create Post</h3>
            <form onSubmit={handlesubmit}>
                <input type="text" className="input" placeholder="title" value={title} onChange={(e)=>settitle(e.target.value)} /><br />
                <input type="text" className="input" placeholder="image" value={image} onChange={(e)=>setimage(e.target.value)} /><br />
                <input type="text" className="input" placeholder="content" value={caption} onChange={(e)=>setcaption(e.target.value)} /><br />
                <button className="button1">Post</button>
            </form>
        </div>
        <div className="col-12 col-md-6 col-lg-6 col-xl-6 timeline">
            <Timeline />
        </div>
        <div className="col-12 col-md-6 col-lg-2 col-xl-2 getlist">
         <button onClick={handleclick} className="button2">get users</button>
            {
             user!=null?<Showusers user={user} />:''
            }
        </div>
        </div>
        </div>
    )
}

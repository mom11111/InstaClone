import React,{useState} from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import '../styles/login.css'

export default function Signup() {
    const [name, setname] = useState('');
    const[email, setemail] = useState('');
    const [password, setpassword] = useState('');
    let history = useHistory();
    const handlesubmit = (e)=>{
        e.preventDefault();
        let body = {
            name,
            email,
            password
        }
        
        axios.post('/register', body).then(user=>{
            console.log(user);
            history.push('/login')
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="login">
        <h3>Register</h3>
            <form onSubmit={handlesubmit}>
                <input type="text" className="input" placeholder="name" value={name} onChange={(e)=>setname(e.target.value)} /> <br />
                <input type="text" className="input" placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)} /><br />
                <input type="text" className="input" placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)} /><br />
                <button className="button">Register</button>
                <button className="button"><a href="/login">Login</a></button>
            </form>
        </div>
    )
}

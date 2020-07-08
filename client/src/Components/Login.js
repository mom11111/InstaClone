import React,{useState} from 'react'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../styles/login.css'

export default function Login() {
    const[email, setemail] = useState('');
    const [password, setpassword] = useState('');
    let history = useHistory();
    const handlesubmit = (e)=>{
        e.preventDefault();
        let body = {
            email,
            password
        }
        Axios.post('/login', body).then(user=>{
            console.log(user);
            sessionStorage.setItem('myuser',JSON.stringify(user.data));
            history.push('/post');
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="login">
        <h3>Login</h3>
            <form onSubmit={handlesubmit}>
                <input type="text" className="input" placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)} /><br />
                <input type="text" className="input" placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)} /><br />
                <button className="button">login</button>
            </form>
        </div>
    )
}

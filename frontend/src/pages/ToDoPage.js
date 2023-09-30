import {React,useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Box } from "@chakra-ui/react";
import Navbar from '../components/Navbar';
import ToDoPanel from '../components/ToDoPanel';

import CreateTodo from '../components/CreateTodo';

const ToDoPage = () => {
    const[user,setUser]=useState();
    const navigate=useNavigate();
    
    useEffect(()=>{
        const userDetails=JSON.parse(localStorage.getItem("userDetails"))
         setUser(userDetails);
           if (!userDetails.token) {
             navigate("/");
           }
          if (!userDetails) {
            navigate("/");
          }
       
        
    
    },[navigate]);
  return (
    <>
    
        <div style={{ width: "100%" }}>
          {user && <Navbar user={user} />}
          <div style={{ paddingTop: "20px" }}>
            <div>{user && <ToDoPanel user={user} />}</div>
          </div>
        </div>
     
    </>
  );
}

export default ToDoPage

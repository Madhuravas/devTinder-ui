import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios"
import {BASE_URL} from "../utils/constants";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";


const Body = () =>{
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const fetchUserDetails = async () =>{
       try{
        let userData = await axios.get(BASE_URL + "/profile/get", {withCredentials:true});
        dispatch(addUser(userData.data.data));
       }catch(err){
          if(err.status === 401){
            navigator("/login");
          }
       }
    }


    useEffect(() =>{
        fetchUserDetails();
    }, []);
    
    return(
        <>
           <Navbar/>
           <Outlet/>
           <Footer/>
        </>
    )
}

export default Body;
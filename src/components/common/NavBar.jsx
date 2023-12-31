
import React , {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.svg';
import { setToken , setUser , setLogin} from '../../slices/slice';
import {useDispatch , useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import {BiLogOut} from "react-icons/bi"
const NavBar = () => {
  const navigate = useNavigate();
  const {user,token , Login} = useSelector((state)=>state.auth);
  
  




  

  

  const dispatch = useDispatch();
  const navVariant = {
    initial: {
      x: -3000,
    },
    animate: {
      x: 0,
      transition: {
        duration: 1,
        when: "beforeChildren",
      },
    },
  };

  const childVariant = {
    initial: {
      y: -100,
    },
    animate: {
      y: 0,
      transition: {
        duration: 2,
        delay:1,
        type: "spring", stiffness: 500, damping: 10
      },
    },
  };

 

  const logOutHandler = ()=>{
        
      dispatch(setLogin(false));
        dispatch(setToken("null"));
        localStorage.setItem("token","null");
        dispatch( setUser(null)) ; 
        navigate("/");
  }

  return (
    <motion.div
      className='flex flex-row  flex-wrap justify-evenly h-max border-b-[1px] mt-2 border-b-blue-200'
      variants={navVariant}
      initial='initial'
      animate='animate'
    >
      <motion.span
        className='text-4xl text-blue-100'
        variants={childVariant}
        initial='initial'
        animate='animate'
      >
        Noob Chat
      </motion.span>

          { 
            Login && <motion.span  className='text-lg  self-center px-2 py-1 rounded-sm text-black  bg-blue-100  cursor-pointer flex flex-row gap-2 items-center hover:bg-slate-300'
        variants={childVariant}
        initial='initial'
        animate='animate'>WelCome ! {user?.firstName}</motion.span>
            
          }

          {

        Login && <motion.span   className='text-lg  self-center px-2 py-1 rounded-sm text-black  bg-blue-100  cursor-pointer flex flex-row gap-2 items-center hover:bg-slate-300'
        variants={childVariant}
        initial='initial'
        animate='animate' onClick={logOutHandler} >  Log Out <BiLogOut className='animate-pulse'/> </motion.span>
 

          }


        </motion.div>

  );
};

export default NavBar;

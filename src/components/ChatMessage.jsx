import React from 'react'
import {useSelector} from "react-redux"
import { useState } from 'react';
const ChatMessage = ({message , sender , receiver}) => {

    const {user} = useSelector((state)=>state.auth);
    const senderName = sender?.firstName;
    const reeiverName = receiver?.firstName;
   
    const date = new Date(message?.createdAt);
    const  timeString = date.toTimeString().slice(0, 6);
    const [noon,setNoon] = useState( timeString.split(":")[0]>=12?"pm":"am" );
    
    

  return (
    <div  className={`flex flex-col w-[100%]`}>

           <span>{message?.message} </span> 
           {message?.user === user?._id  ?(<></>) : (<> {
            message?.user===sender?._id ? (<span  className='text-[10px] text-green-500 border-t-2 border-t-blue-200'>{sender?.firstName }    at    {timeString + noon}</span>):(<span className='text-[10px] text-green-500 border-t-2 border-t-blue-200'>{receiver?.firstName }    at    {timeString + noon}</span>)
           } </>)}


    </div>
  )
}

export default ChatMessage
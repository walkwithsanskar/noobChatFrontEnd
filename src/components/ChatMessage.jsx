import React from 'react'
import {useSelector} from "react-redux"

const ChatMessage = ({message , sender , receiver}) => {

    const {user} = useSelector((state)=>state.auth);
    const senderName = sender?.firstName;
    const reeiverName = receiver?.firstName;
    
    

  return (
    <div  className={`flex flex-col w-[100%]`}>

           <span>{message?.message} </span> 
           {message?.user === user?._id  ?(<></>) : (<> {
            message?.user===sender?._id ? (<span  className='text-[10px] text-green-500 border-t-2 border-t-blue-200'>{sender?.firstName}</span>):(<span className='text-[10px] text-green-500 border-t-2 border-t-blue-200'>{receiver?.firstName}</span>)
           } </>)}


    </div>
  )
}

export default ChatMessage
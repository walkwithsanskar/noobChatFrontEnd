import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import {AiOutlineDelete} from "react-icons/ai"
import { deleteChatById } from '../services/operations/chatApi'
const ChatBar = ({chat , currentChat , setChats}) => {

    const {user} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const sender = chat?.sender?._id;
    const receiver = chat?.receiver?._id;
   
  const barHandler = ()=>{

      dispatch(deleteChatById(chat?._id , setChats));

  }

  return (
    <div  className={`   ${chat?._id===currentChat?._id?"bg-white":"bg-blue-400"}   rounded-lg px-2 py-1`}> 

                {
                    (user?._id===sender) && <div className='flex flex-row gap-2 w-[100%]  sm:flex-wrap'>

                        <img src={chat?.receiver?.profilePic} alt="" className='border-2 border-slate-500 w-[50px] min-w-[50px] object-cover aspect-square rounded-[50%]' />
                        <div className='flex flex-col '>
                        <span>{chat?.receiver?.firstName}</span>
                        <h1>{chat?.receiver?.email}</h1>

                        </div>
                        <AiOutlineDelete  className='self-center text-2xl animate-pulse' onClick={barHandler}/>
                    </div>

                }
                {
                    (user?._id === receiver) && <div className='flex flex-row gap-2'>

                            <img src={chat?.sender?.profilePic} alt="" className='border-2 border-slate-500 w-[50px] object-cover aspect-square rounded-[50%] min-w-[50px]' />

                            <div className='flex flex-col'>

                            <span>{chat?.sender?.firstName}</span>
                            <h1>{chat?.sender?.email}</h1>
                            </div>
                            <AiOutlineDelete  className='self-center text-2xl animate-pulse' onClick={barHandler}/>
                            </div>
                }


    </div>
  )
}

export default ChatBar
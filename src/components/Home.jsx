import React, { useEffect , useRef } from 'react'
import { useState } from "react";
import ScrollableFeed from 'react-scrollable-feed'
import {useDispatch , useSelector} from "react-redux"
import {useNavigate , Navigate} from "react-router-dom"
import EmojiPicker from 'emoji-picker-react'
import {FiSearch} from "react-icons/fi"
import { createMessage } from '../services/operations/chatApi';
import { search } from '../services/operations/authApi';
import {Link} from "react-router-dom"
import ChatBar from './ChatBar';
import ChatMessage from './ChatMessage';
import { getChat } from '../services/operations/chatApi';
import {MdOutlineAddToPhotos} from "react-icons/md"
import { createChat } from '../services/operations/chatApi';
import { motion  , AnimatePresence} from 'framer-motion';
import {BsEmojiWinkFill} from "react-icons/bs"
import {BsFillArrowDownCircleFill , BsFillArrowUpCircleFill} from "react-icons/bs"
import io from "socket.io-client"

const ENDPOINT = "https://noobchatbackend.onrender.com"
let socket ;

const Home = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const elementRef = useRef(null);
  const [showEmoji , setShowEmoji] = useState(false);
  
  const {user , token , currentChatData } = useSelector((state)=>state.auth);

  

  const [chats , setChats] = useState(user?.chats);
  const [currentChat,setCurrentChat] = useState(null);
  const [newText,setNewText] = useState(null);
 
  const [currentMessages,setCurrentMessages] = useState("");
  const [loading,setLoading] = useState(true);
  const [formData , setFormData] = useState({
    email:""
  })

  const[showDiv , setShowDiv] = useState(false);
  const [searchResults , setSearchResults] = useState([]);
  const [message,setMessage] = useState("");


  //socket setup
  useEffect(()=>{
    socket= io.connect(ENDPOINT);
    
  
  } , [])


  // all the handlers
  const changeHandler=(event)=>{
 
    setFormData((prev)=>{
      return {...prev , [event.target.name]:event.target.value}
    })
    setLoading(true);
    setShowDiv(true);
    // dispatch(search(formData?.email , setSearchResults ));
    // if(searchResults===[]){
    //   setLoading(true);
    //   setShowDiv(true);
    // }else{
    //   setLoading(false);

    // }
  }

 

  useEffect(()=>{


    if(formData?.email!==""){

      dispatch(search(formData?.email , setSearchResults ));
      if(searchResults===[]){
        setLoading(true);
        setShowDiv(true);
      }else{
        setLoading(false);
  
      }
    }else{
      setSearchResults([]);
    }
  } , [formData?.email])
  
  const chatHandler = (chat) =>{
    //need to make some changes here
    socket.emit("join-chat" , chat._id);
    dispatch(getChat(chat._id , setCurrentChat , setCurrentMessages,socket));
    // setCurrentChat(currentChatData);
    // setCurrentMessages(currentChatData?.messages);
    // socket.on("receive-message" , (message)=>{
    //   console.log(message);
    //   console.log(currentChat);
    //   console.log(message?.chat);
    //   console.log(currentChat?._id);
    //   console.log(message?.chat===currentChat?._id);
    //   if(message?.user !== user?._id && message?.chat===currentChat?._id ){
    //     setNewText(message);
        

    //   }
    // })
    
    
    
    
  } 
  

  const createChatHandler = (receiver) =>{

    dispatch(createChat(user?.email,receiver,setChats));

  }

  const emojiHandler = (emojiData ) =>{

    setMessage(message + emojiData?.emoji);

  }

  //new code 
  useEffect(()=>{
    socket.on("receive-message" , (message)=>{
      if(message?.user !== user?._id && message?.chat===currentChat?._id ){
        setNewText(message);
        

      }
    })
        

  } , [currentChat])


    useEffect(()=>{

        if(newText!==""  && newText?.chat===currentChat?._id ){
          setCurrentMessages((prev)=>{
            return [...prev,newText]
          })

        }

    } , [newText])
 
   
    const sendHandler = () =>{
      setMessage("");
      dispatch(getChat(currentChatData?._id , setCurrentChat , setCurrentMessages));
      // setCurrentChat(currentChatData);
      dispatch(createMessage( currentChatData?._id , message , setCurrentMessages , socket));
     
      
    
    

    }


    //add to github
    const [showYourChats , setShowYourChats] = useState(false);

    
  return (
    <div className='flex lg:flex-row md:flex-row sm:flex-row flex-col'>

      <div className=' lg:w-max md:w-max sm:w-max w-[100%] relative lg:h-[93.8vh] md:h-[93.8vh] sm:h-[93.8vh] h-max  lg:max-h-max md:max-h-max sm:max-h-max   max-h-[250px] overflow-y-auto bg-blue-500  bg-opacity-60  rounded-lg px-2 py-2 flex flex-col '>

                    <div className='relative flex flex-row w-[100%]  min-w-[20vw] justify-between  bg-blue-200 rounded-lg px-3 pt-2 pb-1'>

                                <input type='text' name="email" placeholder='Search Users To Chat With'  className='self-center focus:outline-none font-medium  flex-grow bg-transparent text-black placeholder:text-black  text-lg ' autoComplete="off"  
                            onFocus={(event)=>{
                              setShowDiv(true); 
                              if(event.target.value==""){
                                setLoading(true);
                              }else{
                                setLoading(false);
                              }
                            
                            }}  onChange={changeHandler} />
{/* 
onBlur={()=>{
                              
                              setShowDiv(false);
                              
                              setLoading(true);
                              }}  */}
                
                <FiSearch className="text-2xl animate-pulse" onClick={()=>setShowDiv(!showDiv)} />
               
                {
                  
                     showDiv && 
                     


                     <motion.div className="absolute   lg:top-12 md:top-12 sm:top-12 top-12 left-0 right-0 min-h-min max-h-56 h-max bg-neutral-300  overflow-y-scroll scroll-smooth  rounded-[5px] scrollbar-thin scrollbar-transparent shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]  overflow-x-hidden z-10" initial={{x:-300 , opacity:0}} animate={{x:0,opacity:1}} >
                          {


                            loading &&
                            <div className='w-[100%] flex justify-center'>
                            <div className="custom-loader "></div>

                            </div>

                          }
                          {
                            searchResults.length===0 && formData?.email!=="" && <div>

                              <p className='text-xl px-2 py-3 text-center'>No users Found</p>
                            </div>
                          }

                          {
                            searchResults.map((user,index)=>{
                              return <div  key={index} className="flex flex-row w-[100%]   px-2 py-2 rounded-sm gap-2  border-b
                                 border-b-slate-200">
                                <div className='w-[40px] min-w-[40px]'>
                                  <img src={`${user?.profilePic}`} className='border-2 border-slate-500 w-[40px] object-cover aspect-square rounded-[50%]' alt="" />
                                </div>
                                
                                <div className=' text-slate-950 text-sm self-center w-fit max-w-[100px]  flex flex-col ' >
                                  <span> {user?.email}</span> <MdOutlineAddToPhotos className='text-xl self-center animate-pulse' onClick={()=>{createChatHandler(user?.email)}}/>
                                </div>

                              
                              </div>
                    
                            })
                          }
                          
                     </motion.div>
                  
                }

                      
                    </div>

                    <div className='flex flex-col gap-2 mt-2 lg:max-h-fit md:max-h-fit sm:max-h-fit max-h-[150px] overflow-y-auto'>
                          <span className='text-blue-100 flex flex-row items-center gap-2 cursor-pointer' onClick={()=>setShowYourChats(!showYourChats)} >Your Chats 

                            {
                              showYourChats ? (<BsFillArrowUpCircleFill/>) : (<BsFillArrowDownCircleFill/>)
                            }
                           </span>

                          
                          {
                            showYourChats && chats.map((chat,index)=>{

                              return(
                                
                                
                                
                                <motion.div key={index} className='cursor-pointer' onClick={()=>{chatHandler(chat)}} initial={{y:-300 , opacity:0}} animate={{y:0,opacity:1}} >

                                  <ChatBar chat={chat}  setChats={setChats} key={index} currentChat={currentChat}/>
                                  </motion.div>  

                                  ) 
                            })
                          }
                           {
                            showYourChats && chats.length===0 && <motion.div initial={{y:-300 , opacity:0}} animate={{y:0,opacity:1}}className='text-black text-xl'>You Got No Chats</motion.div>
                          }



                    </div>



      </div>

      {/* home right */}
     
                          


      
      <motion.div className='lg:w-max md:w-max sm:w-max w-[100%] flex-grow lg:h-[93.8vh]  md:h-[93.8vh] sm:h-[93.8vh] h-[70vh] bg-blue-300 bg-opacity-70 rounded-xl lg:ml-2 md:ml-2 sm:ml-2 ml-0 mr-2 flex flex-col  py-3 px-2 gap-2 relative  ' initial={{x:1000}} animate={{x:0}} transition={{when:"beforeChildren",staggerChildren:1}}> 
                
                      {

                        currentChat===null ? (<div className='w-[100%] h-[100%] flex flex-row justify-center items-center text-xl sm:text-xl md:text-2xl lg:text-2xl'> No Chat Selected To Preview </div>) : (<>
                  {/* chat conatiner */}
                
        <ScrollableFeed forceScroll={true}>
   
            <div className='flex flex-col gap-2 overflow-y-scroll overflow-x-hidden w-[100%] flex-grow bg-blue-500  bg-opacity-30 rounded-lg py-3 px-2 relative '  >                
                            {
                              currentMessages.map((message,index)=>{
                                return (
                                <div className={`${user?._id===message?.user?"self-end":"self-start"} ${user?._id===message?.user?"bg-blue-300":"bg-blue-100"}  rounded-sm px-2 py-1`}  key={index}>
                                <ChatMessage message={message} sender={currentChat?.sender} receiver={currentChat?.receiver} />

                                </div>
                                )
                              })
                            }
                            

            </div>
        </ScrollableFeed>
                  
                {/* send message container  */}
            <div className='flex flex-row items-stretch mb-4 px-2 gap-2 relative'> 


                <input type="text"  className='flex-grow  bg-transparent placeholder:text-black border-b border-b-gray-700 placeholder:text-lg focus:outline-none' value={message} onChange={(e)=> {   
                  
                  setMessage(e.target.value)}}  required placeholder='type a message  '/>

                  <BsEmojiWinkFill className='self-center text-2xl' onClick={()=>setShowEmoji(!showEmoji)}></BsEmojiWinkFill>

                  {
                    showEmoji && <div  className='fixed lg:top-[190px] lg:right-[60px] md:top-[160px] md:right-[80px] sm:top-[160px] sm:-right-[120px] top-[180px] right-[80px]'> 
                    
                    <EmojiPicker theme="dark" width={300} height={400} onEmojiClick={emojiHandler}/>
                    
                    </div>
                  }
                 

                <button className='px-4 py-1 bg-blue-950 text-white rounded-sm ' 
                onClick={sendHandler}>Send</button>

            </div>
                        </>)
                      }



           
       </motion.div>
                    
     

    </div>
  )
}

export default Home

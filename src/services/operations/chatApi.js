import { apiConnector } from "../apiconnector";
import {chatEndpoints} from "../apis"
import {toast} from "react-hot-toast"
import { setCurrent } from "../../slices/slice";

const {
    createChatApi,
createMessageApi,
getChatApi ,
deleteChat
} = chatEndpoints

export function createMessage(chatId , message , setCurrentMessages , socket){

return async(dispatch)=>{

    try{

        const headers = {
            Authorization : "Bearer "+localStorage.getItem("token")
        }

        const response = await apiConnector("POST" , createMessageApi , {chatId:chatId,message:message},headers);

        if(response?.data?.success===true){
            setCurrentMessages((prev)=>[...prev , response?.data?.createdText]);
            socket.emit("send-message" , response?.data?.createdText , response?.data?.createdText?.chat);

            

        }



    }catch(error){
        toast.error("couldNot send message at the moment")
        console.log(error);
    }
}
}


export function getChat(chatId , setCurrentChat , setCurrentMessages,socket ){

    return async(dispatch)=>{

            try{

                const headers = {
                    Authorization : "Bearer "+localStorage.getItem("token")
                }
        
                const response = await apiConnector("POST" , getChatApi + chatId , null,headers);
        
                if(response?.data?.success===true){
                    dispatch(setCurrent(response?.data?.chats));
                    setCurrentChat(response?.data?.chats)
                    setCurrentMessages(response?.data?.chats?.messages);
                   
                
                    
        
                }
        




            }catch(error){
                toast.error("couldnot fetch chat at the moment");
            }

    }
}

export function deleteChatById(chatId , setChats){

    return async(dispatch)=>{
        try{
            const headers = {
                Authorization : "Bearer "+localStorage.getItem("token")
            }
            const response = await apiConnector("DELETE" , deleteChat + chatId,"",headers  )
            if(response?.data?.success===true){
                toast.success("chat deleted");
                setChats((prev) => {
                    return prev.filter((chat,index)=> chat?._id!==chatId );
                })

            }


        }catch(error){
                toast.error("couldnot delete the chat");
        }
    }
}

export function createChat(sender , receiver , setChats){
return async(dispatch)=>{

    try{
        
        const headers = {
            Authorization : "Bearer "+localStorage.getItem("token")
        }
        const response = await apiConnector("POST" , createChatApi,{sender:sender,receiver:receiver},headers  )
        if(response?.data?.success===true){
            toast.success("chat created successfully");
            setChats((prev)=>{
                return [...prev,response?.data?.newChat]
            })
           

        }


    }catch(error){
        console.log(error);
        toast.error("cannot create chat at the moment")
    }
}
}
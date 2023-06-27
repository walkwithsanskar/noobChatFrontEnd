import {authEndpoints} from "../apis"
import {toast} from "react-hot-toast"
import {apiConnector} from "../apiconnector"
import {setToken , setLogin,setUser , setCurrentChat} from "../../slices/slice"
const {
    signUpApi,
    logInApi,
   sendOtp,
   searchByMail
} = authEndpoints;



export function sendingOtp(email){

    return async(dispatch)=>{
        let toastId = toast.loading("Sending Otp  Please Be Patient");
        try{

            const headers = {
                'Content-Type': 'application/json'
              }

            const response = await apiConnector("POST" , sendOtp , {email:email} ,headers );
            console.log(response);
            if(response?.data?.success === true){

                toast.dismiss(toastId);
                toast.success("OTP sent successfully please check your email");

            }

        }catch(error){
            console.log(error);
            toast.dismiss(toastId);
            toast.error("could not send otp");
            
        }
    }
}

export function signUp(signUpData){

    return async(dispatch)=>{
        let toastId = toast.loading("verifying Otp  Please Be Patient");
        try{


            const response = await apiConnector("POST" , signUpApi ,  signUpData  );
            console.log(response);
            if(response?.data?.success === true){

                toast.dismiss(toastId);
                toast.success("OTP verified successfully please proceed to login");

            }
                


        }catch(error){
                toast.dismiss(toastId);
                toast.error("invalid Otp ")
        }
    }
}


export function logIn(loginData,navigate ){

    return async(dispatch)=>{

        const toastId= toast.loading("logging in");
        try{

            const response = await apiConnector("POST" , logInApi , loginData);
            if(response?.data?.success===true){
                toast.dismiss(toastId);
        
               
                dispatch(setUser(response?.data?.user));
                dispatch(setToken(response?.data?.token));
                localStorage.setItem("token" ,  response?.data?.token);
                dispatch(setLogin(true));
                navigate("/home");
              
            }


        }catch(error){
            toast.dismiss(toastId);
            toast.error("failed to login check your credentials");

        }
    }
}

export function search(email,setSearchResults){

    return async(dispatch) =>{

        try{
            const headers ={
                Authorization:"Bearer " + localStorage.getItem("token")
            }

         const response = await apiConnector("POST",searchByMail +`${email}` ,"" , headers);
         setSearchResults(response?.data?.users);
         

        }catch(error){
            
        }
    }
}
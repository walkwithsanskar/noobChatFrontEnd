import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendingOtp } from '../services/operations/authApi';
import { signUp  , logIn} from '../services/operations/authApi';
import { motion , AnimatePresence  } from 'framer-motion';
// import { Tilt } from 'react-tilt'

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page,setPage] = useState(false);
  const [showOtp , setShowOtp] = useState(false);

  const [loginData,setLoginData] = useState({
    email:"",
    password:""
  })

  const [signUpData,setSignUpData] = useState({
    firstName:"",lastName:"",email:"",password:"",otp:""
  })

  const loginHandler=(event)=>{

    event.preventDefault();
    dispatch(logIn(loginData,navigate));

  }
  const signUpHandler=(event)=>{
      event.preventDefault();
      dispatch(sendingOtp(signUpData?.email));
      setShowOtp(true);
      setPage(!page);
}

const verifyOtpHandler = (event) =>{

    dispatch(signUp(signUpData));
    setShowOtp(false);
    
}
  
  return (

      <div className='flex flex-row justify-center h-[80vh] items-center'>

      {
        showOtp ? (<>

            <motion.div className='flex flex-col gap-2 h-[60vh] items-strech justify-center' initial={{x:600}} animate={{x:0}} exit={{ x: 600 }} transition={{duration:2,type:"spring",stiffness:200 , when:"beforeChildren" , staggerChildren:2}} >
            <span>please enter otp send to your mail {signUpData.email}</span>
              <input required type="text"  placeholder=" enter otp " name="otp"  onChange={(event)=> setSignUpData((prev)=>{

                return {...prev , [event.target.name]:event.target.value}
              })

              
              }  className='self-stretch bg-transparent text-white placeholder:text-white  border-b focus:outline-none' />
              <button className='bg-white  rounded-sm hover:bg-slate-200 duration-100 py-1 self-stretch' onClick={verifyOtpHandler}>Verify Otp</button>

            </motion.div>

        </>) : (<>


          <div className='flex flex-row justify-center h-max'>

        {
          page?(<>
              
  

            <motion.div className='flex flex-col items-center gap-5' initial={{x:600}} animate={{x:0}} exit={{ x: 600 }} transition={{duration:2,type:"spring",stiffness:200 , when:"beforeChildren" , staggerChildren:2}} >

            <h1 className='text-blue-300 text-4xl  '>SignUp</h1>
            <form onSubmit={loginHandler} className='flex flex-col items-stetch gap-5'>

                  <input type="text"   placeholder='enter your firstName' onChange={(event)=>{
                    setSignUpData((prev)=>{

                      return {...prev , 
                      
                        [event.target.name] : event.target.value
                      }
                    } )
                  
                  }} name='firstName' value={signUpData.firstName} className='bg-transparent text-white placeholder:text-white  border-b focus:outline-none text-xl'/>
                  <input type="text"  required placeholder='enter your lastName' onChange={(event)=>{
                    setSignUpData((prev)=>{

                      return {...prev , 
                      
                        [event.target.name] : event.target.value
                      }
                    } )
                  
                  }} name='lastName'  value={signUpData.lastName} className='bg-transparent text-white placeholder:text-white  border-b focus:outline-none text-xl'/>


                  <input type="email"  placeholder='enter your email' onChange={(event)=>{
                    setSignUpData((prev)=>{

                      return {...prev , 
                      
                        [event.target.name] : event.target.value
                      }
                    } )
                  
                  }} name='email' required value={signUpData.email} className='bg-transparent text-white placeholder:text-white  border-b focus:outline-none text-xl'/>

                  <input type="password"  placeholder='enter your password' onChange={(event)=>{
                    setSignUpData((prev)=>{

                      return {...prev , 
                      
                        [event.target.name] : event.target.value
                      }
                    } )
                
                  }} name='password' required value={signUpData.password} className='bg-transparent text-white placeholder:text-white  border-b focus:outline-none text-xl'/>

                  <button className='bg-white  rounded-sm hover:bg-slate-200 duration-100 py-1 self-stretch text-xl' onClick={signUpHandler}>Sign Up </button>

                  <span  onClick={()=>setPage(!page)} className='cursor-pointer'>Already have an account? log In here</span>


            </form>


            </motion.div>





          </>):(<>


            <AnimatePresence  >

              <motion.div  initial={{x:500}} animate={{x:0}} exit={{ x: -500 ,transition:{delay:2}}} transition={{duration:2,type:"spring",stiffness:200 , when:"beforeChildren" , staggerChildren:2}}  className='flex flex-col items-center  gap-4'>

                    <h1 className='text-blue-300 text-4xl' >Login</h1>
                    <form onSubmit={loginHandler} className='flex flex-col items-stretch gap-5'>

                          <input type="email"  placeholder='enter your email' onChange={(event)=>{
                            setLoginData((prev)=>{

                              return {...prev , 
                              
                                [event.target.name] : event.target.value
                              }
                            } )
                          
                          }} name='email' required value={loginData.email} className='bg-transparent text-white placeholder:text-white  border-b focus:outline-none appearance-none focus:bg-transparent focus-within:bg-transparent  text-xl'/>

                          <input type="password"  placeholder='enter your password' onChange={(event)=>{
                            setLoginData((prev)=>{

                              return {...prev , 
                              
                                [event.target.name] : event.target.value
                              }
                            } )
                        
                          }} name='password' required value={loginData.password} className='bg-transparent text-white placeholder:text-white  border-b focus:outline-none text-xl'/>

                          <button className='bg-white  rounded-sm hover:bg-slate-200 duration-100 py-1 self-stretch text-xl'>Log In </button>

                          <span  onClick={()=>setPage(!page)} className='cursor-pointer text-blue-200'>don't have an account? sign up here</span>


                    </form>


              </motion.div>
            </AnimatePresence>


          </>)
        }


    </div>
        </>) 
      }



    {/* <div className='flex flex-row justify-center h-max'>

        {
          page?(<>

            <div className='flex flex-col items-center gap-2'>

<h1 className='text-black text-3xl'>Login</h1>
<form onSubmit={loginHandler} className='flex flex-col items-center gap-2'>

      <input type="text"  placeholder='enter your firstName' onChange={(event)=>{
        setSignUpData((prev)=>{

          return {...prev , 
          
            [event.target.name] : event.target.value
          }
        } )
      
      }} name='firstName' value={signUpData.firstName} className='bg-transparent text-white placeholder:text-white  border-b focus:outline-none'/>
      <input type="text"  placeholder='enter your lastName' onChange={(event)=>{
        setSignUpData((prev)=>{

          return {...prev , 
          
            [event.target.name] : event.target.value
          }
        } )
      
      }} name='lastName' value={signUpData.lastName} className='bg-transparent text-white placeholder:text-white  border-b focus:outline-none'/>


      <input type="email"  placeholder='enter your email' onChange={(event)=>{
        setSignUpData((prev)=>{

          return {...prev , 
          
            [event.target.name] : event.target.value
          }
        } )
      
      }} name='email' value={signUpData.email} className='bg-transparent text-white placeholder:text-white  border-b focus:outline-none'/>

      <input type="password"  placeholder='enter your password' onChange={(event)=>{
        setSignUpData((prev)=>{

          return {...prev , 
          
            [event.target.name] : event.target.value
          }
        } )
    
      }} name='password' value={signUpData.password} className='bg-transparent text-white placeholder:text-white  border-b focus:outline-none'/>

      <button className='bg-white  rounded-sm hover:bg-slate-200 duration-100 py-1 self-stretch'>Sign Up </button>

      <span  onClick={()=>setPage(!page)} className='cursor-pointer'>Already have an account? log In here</span>


</form>


</div>




          </>):(<>

              <div className='flex flex-col items-center gap-2'>

                    <h1 className='text-black text-3xl'>Login</h1>
                    <form onSubmit={loginHandler} className='flex flex-col items-center gap-2'>

                          <input type="email"  placeholder='enter your email' onChange={(event)=>{
                            setLoginData((prev)=>{

                              return {...prev , 
                              
                                [event.target.name] : event.target.value
                              }
                            } )
                          
                          }} name='email' value={loginData.email} className='bg-transparent text-white placeholder:text-white  border-b focus:outline-none'/>

                          <input type="password"  placeholder='enter your password' onChange={(event)=>{
                            setLoginData((prev)=>{

                              return {...prev , 
                              
                                [event.target.name] : event.target.value
                              }
                            } )
                        
                          }} name='password' value={loginData.password} className='bg-transparent text-white placeholder:text-white  border-b focus:outline-none'/>

                          <button className='bg-white  rounded-sm hover:bg-slate-200 duration-100 py-1 self-stretch'>Log In </button>

                          <span  onClick={()=>setPage(!page)} className='cursor-pointer'>don't have an account? sign up here</span>


                    </form>


              </div>

          </>)
        }


    </div> */}

      </div>




  )
}

export default Login
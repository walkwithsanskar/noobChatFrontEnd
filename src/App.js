import React, { useEffect } from "react"
import {Routes , Route} from "react-router-dom"
import NavBar from "./components/common/NavBar";
import OpenRoute from "./components/common/OpenRoute"
import Login from "./components/Login"
import  "./assets/loginbg.jpg"
import Home from "./components/Home";
import {toast} from "react-hot-toast"
function App() {
  
  return (
    <div className={` App min-h-[100vh] max-h-fit w-[100vw] overflow-x-hidden overflow-y-hidden `}>
           <NavBar/>
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/home" element={  

                 <OpenRoute>

                      <Home/>
                 
                 </OpenRoute>
            
                 }/>

            </Routes>


    </div>
  );
}

export default App;

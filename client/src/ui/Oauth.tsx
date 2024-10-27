// import React from 'react'
import { FcGoogle } from "react-icons/fc";

export default function Oauth() {
    const handleGoogleClick = async () =>{
        try{

        }
        catch (error) {

        }

    }
  return (
    <div className="text-center">
        {/* <FcGoogle /> */}
    <button
    onClick={handleGoogleClick}
    type='button'
    className='bg-slate-950 w-full rounded-3xl mt-5 text-white gap-5 p-3 flex text-center uppercase hover:opacity-95'
  
  >
    <div className="text-center flex flex-wrap gap-5">
    <FcGoogle  className="w-5 h-5 place-items-center ml-44"/>
    Continue with google
    </div>
  </button>
  </div>
  )
}

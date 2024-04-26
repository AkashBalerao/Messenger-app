import AuthForm from "./components/AuthForm";
import React from "react";
import styles from "./styles.module.css"

const Auth = () => {
  return (
    <>
    <div className={`min-h-full flex bg-gray-100 px-10 sm:px-20 justify-center items-center`}>
        <div className={styles.mydiv}>
          <div className="hidden sm:block w-1/2 bg-blue-200">
            <div className="flex flex-col justify-center h-full">
              <span className="text-9xl tracking-tight text-center text-gray-900" style={{ fontFamily: "Saniretro", color: "blue" }}>NEARME</span>
              <hr className="w-1/2 h-0.5 bg-gray-400 my-4 mx-auto" />
              <p className="text-center text-lg text-gray-600">Meet strangers and become friends</p>
            </div>
            </div>
          <div className="flex bg-white flex-col justify-center py-12 sm:px-6 lg:px-8 w-full sm:w-1/2">
            <div className="relative z-10 mt-8 sm:mt-0">
              <AuthForm />
            </div>
          </div>
        </div>
    </div>  
    </>

  );
};

export default Auth;

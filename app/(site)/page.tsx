import Image from "next/image";
import AuthForm from "./components/AuthForm";

const Auth = () => {
  return (
    <div 
      className="
        flex 
        min-h-full 
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8 
        bg-gray-100
      "
      style={{
        background: `
          radial-gradient(black 1px, transparent 1px),
          radial-gradient(black 1px, transparent 1px)
        `,
        backgroundSize: '25px 25px',
        backgroundPosition: '0 0, 12.5px 12.5px',
      }}
      >

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <span className="text-center text-7xl tracking-tight text-gray-900" style={{ fontFamily: 'Saniretro', color: 'blue',display: 'block',  }}>NEARME</span>
        <h2 
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          "
          >
            Sign in to your account
        </h2>
      </div>
      <AuthForm />      
  </div>
  )
}

export default Auth;

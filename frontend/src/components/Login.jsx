import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

const Login = ({url}) => {
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [data,setData] = useState({
    email:"",
    password:"",
  });

  const handleChange = (e) => {
    const {name,value} = e.target;
    setData({
      ...data,
      [name]:value
    })
  }


  const handleLogin = async(e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setError("Please fill in all fields.");
      return;
    }
    
    if (data.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/auth/login`,data);
      
      if(response.data.success){
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        localStorage.setItem("token", response.data.token);
        navigate("/home", { state: data.email });
      }
      else{
        setError(response.data.message)
      }

    } catch (error) {
      setError("Invalid credential",error);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center sm:pb-1 pb-12">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-3xl min-h-[80vh] flex flex-wrap rounded-lg border border-blue-500"
      >
        <div className="flex-1 bg-blue-600 rounded-lg flex flex-col items-center p-6">
          <h2 className="text-white text-4xl xs:h-35 sm:h-40 font-bold pt-8">Connectverse</h2>
          <div className="mt-6 text-white text-2xl flex justify-center text-center leading-relaxed">
            <h3 className="hidden text-3xl font-medium xs:block">Connect with <br />
            friends and the <br />
            world around you</h3>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-bold text-black">Login</h2>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <div className="w-full flex flex-col mt-4">
            <label htmlFor="email" className="ml-4 pl-4">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email or username"
              value={data.email}
              onChange={handleChange}
              className="w-4/5 max-w-md mx-auto p-2 mt-1 border border-gray-300 rounded focus:border-blue-600 outline-none"
              required
            />
          </div>

          <div className="w-full flex flex-col mt-4">
            <label htmlFor="password" className="ml-4 pl-4">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChange}
              className="w-4/5 max-w-md mx-auto p-2 mt-1 border border-gray-300 rounded focus:border-blue-600 outline-none"
              required
            />
          </div>

          <div className="w-4/5 max-w-md mx-auto flex justify-between mt-3">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              Remember Me
            </label>
            <a href="/forgot-password" className="text-blue-600 text-sm">
              Forgot Password?
            </a>
          </div>
          <input
            type="submit"
            value="Login"
            className="w-3/5 max-w-xs mt-6 py-3 text-white bg-blue-600 rounded-lg cursor-pointer transition ease-in-out duration-300 transform hover:scale-105"
          />
          <div className='flex gap-2 pt-4'>
            <p>Don't have an account?</p>
            <Link to="/" >
                <p className='text-blue-600 hover:text-black'>Click Here</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

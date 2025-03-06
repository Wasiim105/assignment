import React,{useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios"

const Signup = ({url}) => {

    const [image,setImage] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
      });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
        ...data,
        [name]: value,
    });
    };

    // useEffect(()=>{
    // console.log(formData);
    // },[formData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password !== data.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        const formData = new FormData();
        formData.append("email",data.email);
        formData.append("password",data.password);
        formData.append("name",data.name);
        if(image)
        formData.append("image",image);
        try {
          const response = await axios.post(`${url}/api/auth/register`,formData);
          if(response.data.success){
            setData({
              email:"",
              password:"",
              confirmPassword:"",
              name:"",
            })
            setImage(false);
            setSuccess("Signup successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
          }
          else{
            setError(response.data.message)
          }
        } catch (error) {
          setError("Error signing up. Try again.",error);
        }
    }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center xsl:pt-16 md:pb-12">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl min-h-[screen] flex flex-wrap rounded-lg border border-blue-500">
        
        <div className="flex-1 bg-blue-600 rounded-lg flex flex-col items-center p-6">
          <h2 className="text-white text-4xl xs:h-35 sm:h-45 font-bold pt-8">Connectverse</h2>
          <div className="mt-6 text-white text-2xl flex justify-center text-center leading-relaxed">
            <h3 className="hidden text-3xl font-medium xs:block">Connect with <br />
            friends and the <br />
            world around you</h3>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h2 className="text-3xl font-bold text-black">Sign Up</h2>

          <div className="w-full flex flex-col mt-4">
            <label htmlFor="email" className="ml-4 pl-4">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              required
              className="w-4/5 max-w-md mx-auto p-1 mt-1 border border-gray-300 rounded focus:border-blue-600 outline-none"
            />
          </div>

          <div className="w-full flex flex-col mt-4">
            <label htmlFor="password" className="ml-4 pl-4">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-4/5 max-w-md mx-auto p-1 mt-1 border border-gray-300 rounded focus:border-blue-600 outline-none"
            />
          </div>

          <div className="w-full flex flex-col mt-4">
            <label htmlFor="confirm-password" className="ml-4 pl-4">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="w-4/5 max-w-md mx-auto p-1 mt-1 border border-gray-300 rounded focus:border-blue-600 outline-none"
            />
          </div>

          <div className="w-full flex flex-col mt-4">
            <label htmlFor="name" className="ml-4 pl-4">Full Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-4/5 max-w-md mx-auto p-1 mt-1 border border-gray-300 rounded focus:border-blue-600 outline-none"
            />
          </div>

          <div className="w-full flex flex-col mt-4">
            <label htmlFor="profile" className="ml-4 pl-4">Profile</label>
            <input
              type="file"
              name="profile"
              value={data.profile}
              onChange={(e)=>setImage(e.target.files[0])}
              className="w-4/5 max-w-md mx-auto p-1 mt-1 border border-gray-300 rounded cursor-pointer"
            />
          </div>
        <label className='pt-2'>
            <input type="checkbox" className='mr-2' required />
            I accept the Terms & Conditions
        </label>
          <input
            type="submit"
            value="Create an account"
            className="w-3/5 max-w-xs mt-4 py-3 text-white bg-blue-600 rounded-lg cursor-pointer transition ease-in-out duration-300 transform hover:scale-105"
          />
          <div className='flex gap-2 pt-2'>
            <p>Already have an account?</p>
            <Link to="/login" >
                <p className='text-blue-600 hover:text-black'>Click Here</p>
            </Link>
          </div>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default Signup;

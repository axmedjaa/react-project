import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { signIn } from "../lib/auth"
const Signin = () => {
  const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
      e.preventDefault()
      setIsLoading(true)
      setError(null)
      try {
        const{error}=await signIn(email,password)
        if(error){
          setError(error)
        }else{
          setSuccess(true)
          setTimeout(() => {
            navigate("/")
          }, 300); 
        }
      } catch (error) {
        console.error(error)
        setError(error)
      }finally{
        setIsLoading(false)
      }
    }
    if(success){
      return(
        <div className="text-center text-2xl">
         <p className="text-green-500 text-center">You have successfully signed in!</p>
        </div>
      )
    }
  return (
    <div className="min-h-screen flex  bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-8">
      <div className="max-w-md mx-auto h-full bg-white w-full rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">sign in</h1>
        <form onSubmit={handleSubmit}>
        {error&& <p className="block text-red-500 text-xl font-medium text-center mb-2">{error}</p> }
          <div className="">
          <label htmlFor="email" className="block">email:</label>
          <input  className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm outline-none" 
          id="email" 
          onChange={(e)=>setEmail(e.target.value)}
          type="email" required />
          </div>
          <div>
          <label htmlFor="password" className="block">password:</label>
          <input  id="password" 
          onChange={(e)=>setPassword(e.target.value)}
          
          className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm outline-none" type="password" required />
          </div>
          <button disabled={isLoading} className="w-full  bg-rose-600 px-4 py-2 mt-2 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" type="submit">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="tex-sm text-gray-700 text-center mt-4">Don’t have an account? <Link className="text-sky-400 hover:underline font-medium" to="/signup">Sign up</Link></p>
      </div>
    </div>
  )
}

export default Signin
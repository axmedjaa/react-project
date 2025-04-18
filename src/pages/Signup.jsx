import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { signUp } from "../lib/auth"

const Signup = () => {
  const[email,setEmail]=useState('')
  const[username,setUsername]=useState('')
  const[password,setPassword]=useState('')
  const[confirmPassword,setConfirmPassword]=useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    if(password!==confirmPassword){
      setError('password do nor match')
      setIsLoading(false)
      return
    }
    try {
      const result=await signUp(email,password,username)
      if(result.error){
        setError(result.error)
      }
      setSuccess(true)
      setTimeout(()=>{
        navigate("/signin")
      },300)
    } catch (error) {
      console.error(error)
      setError(error.massage||'failed to create an account')
    }finally{
      setIsLoading(false)
    }
  }
  if(success){
    return (
      <div>
        <p className="text-green-500 text-center">You have successfully signed up!</p>
      </div>
    )
  }
  return (
    <div className="min-h-screen flex  bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-8">
      <div className="max-w-md mx-auto h-full bg-white w-full rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">Create an Account</h1>
        <form onSubmit={handleSubmit}>
          {error&& <p className="block text-red-500 text-xl font-medium text-center mb-2">{error}</p> }
          <div className="">
          <label htmlFor="email" className="block">email:</label>
          <input className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none" 
          id="email" 
          onChange={(e)=>setEmail(e.target.value)}
          type="email" required />
          </div>
          <div>
          <label htmlFor="password" className="block">password:</label>
          <input id="password"
          onChange={(e)=>setPassword(e.target.value)}
          minLength={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none" type="password" required />
          </div>
          <div>
          <label htmlFor="confirmPassword" className="block">confirm password:</label>
          <input className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-none"
          id="confirmPassword"
          onChange={(e)=>setConfirmPassword(e.target.value)}
          type="password" required />
          </div>
          <button className="w-full bg-rose-600 px-4 text-white py-2 mt-2 rounded-lg shadow-sm 
          disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={isLoading}> {isLoading ? 'Signing up...' : 'Sign Up'}</button>
        </form>
        <p className="tex-sm text-gray-700 text-center mt-4">Already have an account? <Link className="text-sky-400 hover:underline font-medium" to="/signin">Sign in</Link></p>
      </div>
    </div>
  )
}

export default Signup
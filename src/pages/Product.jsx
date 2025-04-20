import { useEffect, useReducer, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { supabase } from "../lib/supabase"
import toast from "react-hot-toast"
import { IoArrowBackOutline } from "react-icons/io5"

const Product = () => {
  const{id}=useParams()
  const[item,setItem]=useState(null)
  const[isLoading,setIsLoading]=useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
    fetchItem()
  },[id])
  const fetchItem=async()=>{
    try {
      setIsLoading(true)
      const{data,error}=await supabase.from('add')
      .select('*')
      .eq('id',id)
      .single()
      if(error)throw error
      setItem(data)
      console.log(data)
    } catch (error) {
      console.error("Failed to fetch product",error)
      toast.error(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }
  const initailState={quantity:1}
  const reducer=(state,action)=>{
    switch (action.type) {
      case 'increase':
        return{...state,quantity:state.quantity+1}
      case 'decrease':
        return{...state,quantity:state.quantity-1}
      default:
        break;
    }
  }
  const[state,dispatch]=useReducer(reducer,initailState)
  const handleBack=()=>{
    navigate(-1)
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin h-12 w-12 border-4 border-orange-500 rounded-full border-t-transparent" />
      </div>
    );
  }
  if(!item) return null
  return (
    <div className="min-h-screen py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 ">
          <div>
            <div>
              <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
                <IoArrowBackOutline className="text-xl"/>
               <span className="text-lg mb-1 "> go back</span>
              </button>
            </div>
            <img
            className="w-full object-cover"
            src={item.image_url} alt={item.name} />
          </div>
          <div className="mt-16 flex flex-col space-y-2">
            <h2 className="text-2xl sm:text-4xl">{item.name}</h2>
            <span className="text-2xl flex sm:text-4xl items-center">
              {
                state.quantity>1&&<button
                onClick={()=>dispatch({type:'decrease'})}
                className="bg-gray-50 p-2 rounded">
                  -
                </button>
              }
              {state.quantity}
              <button
              onClick={()=>dispatch({type:'increase'})}
              className="bg-gray-50 p-2 rounded">+</button>
            </span>
            <span className="text-lg sm:text-xl font-semibold">${item.price*state.quantity}</span>
            {item.describe&&<p>{item.describe}</p>}
            <div className="space-x-1 mt-2">
              <button
              className="bg-orange-500 text-white py-2 px-4 rounded-lg">add to cart</button>
              <button className="bg-orange-500 text-white py-2 px-4 rounded-lg">buy now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
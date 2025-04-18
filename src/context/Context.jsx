import { createContext, useContext, useEffect, useState } from "react"
import { getUserProfile, onAuthChange, signOut } from "../lib/auth";
const AuthContext=createContext()
export const AuthProvider = ({children}) => {
    const[user,setUser]=useState(null)
    const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    const unsubscribe=onAuthChange(async (user)=>{
        setUser(user)
        if(user){
            try {
                const userProfile=await getUserProfile(user.id)
                console.log("User profile:", userProfile);
                setProfile(userProfile)
            } catch (error) {
             console.error("Failed to load profile:", error)   
            }
        }else{
            setProfile(null)
        }
        setIsLoading(false)
    })
    return unsubscribe
  },[])
  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };
  const value={
    user,
    profile,
    isLoading,
    isLoggedIn:!!user,
    isAdmin: profile?.username === "axmedja44",
    logout
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth(){
    const context=useContext(AuthContext)
    if(!context)throw new Error("useAuth must be used inside AuthProvider")
    return context
}

import { supabase } from "./supabase";

export async function signUp(email,password,username=''){
    let{data,error }=await supabase.auth.signUp({
        email:email,
        password:password,
    })
    if(error ){
        return {error:error.message}
    }
    if(data?.user){
        const{data:sesionData}=await supabase.auth.getSession()
    if(!sesionData?.session){
        return { message: "Check your email to confirm sign up." };
    }
    const displayName=username||email.split("@")[0]
    const {error:profileError}=await supabase
    .from("users")
    .insert({
        id:data.user.id,
        username:displayName,
        avatar_url:null
    })
    .select()
    .single()
    if(profileError){
        return{error:profileError.message}
    }
}
return {user:data.user}
}
export async function signIn(email,password){
    const{data,error}=await supabase.auth.signInWithPassword({
        email:email,
        password:password
    })
    if(error){
        return{error:error.message}
    }
    if (data?.user) {
        try {
            const profile = await getUserProfile(data.user.id);
            console.log("profile info ", profile);
        } catch (profileError) {
            console.error("Error with profile during signin:", profileError);
        }
    }
    return data
}
export async function getUserProfile(userId){
    const{data,error}=await supabase
    .from('users')
    .select('*')
    .eq('id',userId)
    .single()
    if(error&&error.code==='PGRST116'){
        const{data:userData}=await supabase.auth.getUser()
        const email = userData?.email || `user_${Date.now()}`;
        const defaultUsername = email.split('@')[0]; 
        const{data:newProfile,error:profileError}=await supabase
        .from('users')
        .insert({
            id:userId,
            username:defaultUsername,
            avatar_url:null
        })
        .select()
        .single();
        if (profileError) {
            throw new Error('Error creating user profile.');
        }
        return newProfile
    }
    if (error) {
        throw new Error('Profile fetch failed.');
    }

    return data;
}
export function onAuthChange(callback){
const { data } = supabase.auth.onAuthStateChange((event, session) => {
            callback(session?.user || null, event)
    })
    return () => data.subscription.unsubscribe();
}
export async function signOut() {
    await supabase.auth.signOut()
}
  
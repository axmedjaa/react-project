import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
const AddItems = () => {
    const{id}=useParams()
    const isEditMode=Boolean(id)
  const[formData,setFormData]=useState({
    name: "",
    price: "",
    tags: [],
    image: null,
  })
  useEffect(()=>{
    fetchItem()
  },[id,isEditMode])
  const fetchItem=async()=>{
    if(isEditMode){
        const{data,error}=await supabase.from('add')
        .select('*')
        .eq('id',id)
        .single()
        if(error){
            toast.error('Failed to load item')
        }else{
            setFormData({
                name: data.name || '',
                price: data.price || '',
                tags: data.tags || [],
                image: null,
                image_url: data.image_url||null
            })
        }
    }
  }
  const categoryTags = [
    "all",
    "Breakfast",
    "Brunch",
    "Lunch",
    "Dinner",
    "Snack",
    "drink",
    "fast food"
  ];
  const toggleTag=(tag)=>{
    setFormData((prev=>({...prev,tags:prev.tags.includes(tag)?prev.tags.filter(t=>t!==tag):[...prev.tags,tag]})))
  }
  const handleImage=(e)=>{
    const file=e.target.files[0]
    setFormData((prev)=>({...prev,image:file}))
  }
  const handleChange=(e)=>{
    const{id,value}=e.target
    setFormData((prev)=>({...prev,[id]:value}))
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
        let imageUrl = formData.image_url || null;
        if(formData.image){
        const file = formData.image
        if (!file || !file.type.startsWith('image/')) {
          toast.error('Please select a valid image file');
          return;
        }
        const fileEx=file.name.split('.').pop().toLowerCase()
        const fileName=`${Date.now()}.${fileEx}`
        const filePath = `foods/${fileName}`;
        console.log({ fileName, filePath, file });
        const{data:storageData,error:uploadError}=await supabase.storage
        .from('image')
        .upload(filePath,file,{
          contentType: file.type,
          upsert: false,
        })
      if(uploadError)throw uploadError
      const{data:publicImage}=supabase.storage
      .from('image')
      .getPublicUrl(filePath)
      imageUrl=publicImage.publicUrl
      }
      let error = null;
     if(isEditMode){
        const{error:updateError}=await supabase.from('add')
        .update({
            name: formData.name,
            price: parseFloat(formData.price),
            tags: formData.tags,
            image_url:imageUrl,
        })
        .eq('id', id);
        error=updateError
     }else{
        const{error:inertError}=await supabase.from('add')
        .insert([{
          name:formData.name,
          price:parseFloat(formData.price),
          image_url:imageUrl,
          tags:formData.tags
        }
        ])
        error=inertError
     }if(error)throw error
        toast.success('Food item added successfully!');
        setFormData({ name: "", price: "", tags: [], image: null });
    } catch (error) {
      console.error('Error adding food:', error.message);
      toast.error(isEditMode ? 'Error updating item' : 'Error adding item');
    }
  }

  return (
    <div className='min-h-screen bg-white py-4 px-6'>
      <div className='max-w-7xl mx-auto bg-gray-100 p-6 rounded-lg'>
        <h1 className='text-2xl sm:text-4xl font-semibold'> {isEditMode ? 'Edit Food Item' : 'Add New Food Item'}</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <label className='block font-medium' htmlFor="name">food name:
            <input className='w-full mt-1 p-2 border rounded-lg outline-none' type="text"  id='name' 
            value={formData.name}
            onChange={handleChange}
             />
          </label>
          <label  className='block font-medium' htmlFor="price">price:
            <input  className='w-full mt-1 p-2 border rounded-lg outline-none' type="number"  id='price' 
            value={formData.price}
            onChange={handleChange}
            />
          </label>
          <label className='block font-medium' htmlFor="imge">upload food image:
          <input type="file" accept='image/*'  id="" 
           className="w-full mt-1 text-gray-600"
          onChange={handleImage} />
          </label>
         <span className="block font-medium mb-1">Select Tags:</span>
            <div className="flex flex-wrap gap-2 mb-2">
              {categoryTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${
                    formData.tags.includes(tag)
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
         </div>
         <button type="submit" 
                     className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
         >{isEditMode ? 'Update Item' : 'Add Item'}</button>
        </form>
      </div>
    </div>
  )
}

export default AddItems
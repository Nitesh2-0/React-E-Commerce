import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/ContextAPI";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const Edit = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useContext(ProductContext)
  const {id} = useParams();
  const [product, setproduct] = useState({
    title:"",
    image:"",
    category:"",
    price:"",
    description:""
  });


  useEffect(() => {
    setproduct(products.filter((p) => p.id==id)[0])
  },[id])

  const ChangeHandler = (e) =>{
    setproduct({...product,[e.target.name]: e.target.value})
  }

  const editProductHandler = (event) => {
    event.preventDefault();

    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.category.trim().length < 5 ||
      product.description.trim().length < 5 ||
      product.price.trim().length < 1
    ) {
      alert('At least 4 characters required. not expection in price.');
      return;
    }

    const pi = products.findIndex((p) => p.id==id)
    const copyData = [...products]; 
    copyData[pi] = {...products[pi], ...product}

    setProducts(copyData);
    localStorage.setItem("products", JSON.stringify(copyData))
    toast.success("product edited successfully")
    navigate(-1)
  };

  return (
    <form onSubmit={editProductHandler} className="p-[5%] w-screen flex flex-col items-center h-screen overflow-x-hidden">
      <h1>Edit Product</h1>
      <input type="url" placeholder="image link" className="text-xl bg-zinc-100 rounded p-2 w-1/2 mb-3" onChange={ChangeHandler} name="image" value={product && product.image} />
      <input type="text" placeholder="title" className="text-xl bg-zinc-100 rounded p-2 w-1/2 mb-3" onChange={ChangeHandler} name="title" value={product && product.title} />
      <div className="flex gap-5 w-1/2">
        <input type="number" min="1" placeholder="Price" className="text-xl bg-zinc-100 rounded p-2 w-[50%] mb-3" onChange={ChangeHandler} name="price" value={product && product.price} />
        <input type="text" placeholder="Category" className="text-xl bg-zinc-100 rounded p-2 w-[50%] mb-3" onChange={ChangeHandler} name="category" value={product && product.category} />
      </div>
      <textarea placeholder="Enter product description here." className="text-xl bg-zinc-100 rounded p-2 w-[50%] mb-3" rows="7" onChange={ChangeHandler} name="description" value={product && product.description}></textarea>
      <div className="w-1/2">
        <button className="self-start py-2 px-4 md:px-5 border rounded border-blue-200 text-blue-300 mb-4 hover:text-white hover:bg-blue-500 trnasition">
          Edit Product
        </button></div>
    </form>
  )
}

export default Edit

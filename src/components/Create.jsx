import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/ContextAPI";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { useNavigate} from "react-router-dom";

const Create = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useContext(ProductContext)
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  const AddProductHandler = (event) => {
    event.preventDefault();

    if (
      title.trim().length < 5 ||
      image.trim().length < 5 ||
      category.trim().length < 5 ||
      description.trim().length < 5 ||
      price.trim().length < 1
    ) {
      alert('At least 4 characters required. not expection in price.');
      return;
    }

    const product = {
      id: nanoid(),
      title,
      image,
      price,
      category,
      description
    };

    setProducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]))
    toast.success("product created successfully")
    navigate('/')
  };

  return (
    <form onSubmit={AddProductHandler} className="p-[5%] w-screen flex flex-col items-center h-screen overflow-x-hidden">
      <h1 className="text-3xl w-1/2 mb-5 font-semibold">Add New Product</h1>
      <input type="url" placeholder="image link" className="text-xl bg-zinc-100 rounded p-2 w-1/2 mb-3" onChange={(e) => setImage(e.target.value)} value={image} />
      <input type="text" placeholder="title" className="text-xl bg-zinc-100 rounded p-2 w-1/2 mb-3" onChange={(e) => setTitle(e.target.value)} value={title} />
      <div className="flex gap-5 w-1/2">
        <input type="number" min="1" placeholder="Price" className="text-xl bg-zinc-100 rounded p-2 w-[50%] mb-3" onChange={(e) => setPrice(e.target.value)} value={price} />
        <input type="text" placeholder="Category" className="text-xl bg-zinc-100 rounded p-2 w-[50%] mb-3" onChange={(e) => setCategory(e.target.value)} value={category} />
      </div>
      <textarea placeholder="Enter product description here." className="text-xl bg-zinc-100 rounded p-2 w-[50%] mb-3" rows="7" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
      <div className="w-1/2">
        <button className="self-start py-2 px-4 md:px-5 border rounded border-blue-200 text-blue-300 mb-4 hover:text-white hover:bg-blue-500 trnasition">
          Add New Product
        </button></div>
    </form>
  )
}

export default Create;
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios';
import Loading from './Loading';
import { ProductContext } from './../utils/ContextAPI';
import { toast } from 'react-toastify';

const Details = () => {
  const navigate = useNavigate()
  const[products, setProducts] = useContext(ProductContext)
  const [product, setProduct] = useState(null);
  const {id} = useParams()

  // const getSingleProduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setProduct(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // getSingleProduct();
    if(!product) {
      setProduct(products.filter((p) => p.id == id)[0])
    }
  }, []);

  const productDeleteHandler = (id) => {
    const filteredProducts = products.filter((p) => p.id !== id)
    setProducts(filteredProducts)
    localStorage.setItem("products", JSON.stringify(filteredProducts))
    toast.success("product deleted successfully")
    navigate("/")
  }

  return (
    product ? (
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center p-2 lg:p-20 space-y-8 lg:space-y-0 lg:space-x-4">
        <img className="object-contain h-96 p-7 md:p-0 md:h-[70%] w-full lg:w-96 h-auto" src={`${product.image}`} alt="Backpack" />
        <div className="content p-8 h-1/2 md:h-auto mb-4 w-full lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{product.title}</h1>
          <h3 className="text-2xl lg:text-3xl text-gray-700 mb-2">{product.category}</h3>
          <h2 className="text-3xl lg:text-4xl text-green-600 mb-4">$ {product.price}</h2>
          <p className="text-lg lg:text-xl text-gray-700 mb-6">{product.description}</p>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 justify-center lg:justify-start">
            <Link to={`/edit/${product.id}`} className="bg-blue-600 md:bg-white border-blue-200 border font-semibold px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition lg:w-auto flex items-center justify-center lg:justify-start">
              <span className="lg:hidden text-white">Edit</span>
              <span className="hidden lg:inline">Edit</span>
            </Link>
            <button onClick={() => productDeleteHandler(product.id)} className="bg-red-600 md:bg-white border-red-200 border font-semibold px-4 py-2 rounded hover:bg-red-500 hover:text-white transition lg:w-auto flex items-center justify-center lg:justify-start">
              <span className="lg:hidden text-white">Delete</span>
              <span className="hidden lg:inline">Delete</span>
            </button>
          </div>
        </div>
      </div>
    ) : <Loading />
  );
}

export default Details;

import React, { useContext, useEffect,useState } from 'react';
import Nav from "./Nav";
import { Link, useLocation } from 'react-router-dom';
import { ProductContext } from '../utils/ContextAPI';
import Loading from './Loading';
import axios from '../utils/axios';

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation()

  const [filterproduct, setfilterproduct] = useState(null)

  const category = decodeURIComponent(search.split('=')[1]);
  // const getcategorywiseproduct = async () => {
  //   try {
  //     const { data } = await axios.get(`products/category/${category}`)
  //     setfilterproduct(data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  useEffect(() => {
    if(!filterproduct || category == 'undefined') {
      setfilterproduct(products)
    }
    if (category != "undefined") {
      // getcategorywiseproduct()
      setfilterproduct(products.filter(p => p.category == category))
    };
  }, [category,products])
 

  return (
    <>
      <Nav />
      {products ? (
        <div className="flex flex-wrap justify-center overflow-x-hidden overflow-y-auto0 w-screen h-screen gap-5 p-5 pt-12">
          {filterproduct && filterproduct.map((product, index) => (
            <Link to={`/details/${product.id}`} key={index} className="card border shadow rounded w-full sm:w-[45%] md:w-[30%] lg:w-[20%] xl:w-[15%] h-[30vh] flex flex-col p-3 justify-center items-center">
              <div className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${product.image})` }}></div>
              <h1 className="text-center text-xs font-semibold hover:text-blue-300">{product.title}</h1>
            </Link>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;

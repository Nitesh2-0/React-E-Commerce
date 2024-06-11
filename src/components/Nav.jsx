import React, { useContext } from "react";
import { ProductContext } from "../utils/ContextAPI";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext); 
  let distinct_category = products && products.reduce((ac, cv) => [...ac, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  const color = () => {
    return `rgb(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.8)`
  }

  return (
    <nav className="w-full md:w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-5">
      <a className="py-2 px-5 border rounded border-blue-200 text-blue-300" href="/crate">Add New Product</a>
      <hr className="w-[80%] my-3" />
      <h1 className="text-2xl w-[80%] mb-2">Category Filter</h1>
      <div className="w-[100%] p-4">
        {distinct_category.map((c, idx) => (
          <Link key={idx} to={`/?category=${c}`} className="mb-3 flex items-center text-lg">
            <span className="w-[15px] h-[15px] rounded-full mr-3 animate-pulse" style={{backgroundColor:color()}}></span>
            <span className="text-gray-700 ">{c}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;

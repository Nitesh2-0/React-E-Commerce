import React, { useContext } from "react";
import { ProductContext } from "../utils/ContextAPI";
import { Link } from "react-router-dom";

const Nav = () => {
  const [products] = useContext(ProductContext);
  let distinct_category = products && products.reduce((ac, cv) => [...ac, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  const color = () => {
    return `rgb(${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()},0.8)`
  }
  return (
    <nav className="flex flex-col lg:w-[20%] h-full bg-zinc-100 p-2 lg:p-4">
      <Link to='/create' className="mb-4 lg:mb-0">
        <button className="py-2 px-4 md:px-5 border rounded border-blue-200 text-blue-300 w-full lg:w-auto">
          Add New Product
        </button>
      </Link>
      <hr className="w-full my-3 border-t border-gray-200" />
      <h1 className="text-2xl mb-2 text-center">Category Filter</h1>
      <div className="w-full p-4">
        {distinct_category.map((c, idx) => (
          <Link key={idx} to={`/?category=${c}`} className="mb-3 flex items-center text-lg">
            <span className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: color() }}></span>
            <span className="text-gray-700">{c}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;

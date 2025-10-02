import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import axios from "axios";
import LoadingCircle from '../components/LoadingCircle';

const HomePage = ({ addIcon, setAddIcon }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [proExists, setProExist] = useState(false);

  if (addIcon === false) {
    setAddIcon(true);
  }

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/products');
      const responseArr = response.data.data;

      setProducts(responseArr);
      setProExist(responseArr.length > 0);
    } catch (e) {
      console.log(e.response?.data?.message || e.message);
      setProducts([]);
      setProExist(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-center font-mono font-medium text-[32px] dark:text-sky-500">
        Current Products{" "}
        <p className="m-2">
          <RocketLaunchIcon className="w-7 m-1 transition-all duration-300 ease-in-out hover:drop-shadow-[0_0_15px_#22d3ee] hover:text-cyan-300"/>
        </p>
      </div>
      <div className="grid min-[1165px]:grid-cols-3 min-[859px]:grid-cols-2 grid-cols-1 gap-2 gap-y-20 py-10">
        {loading ? (
          <LoadingCircle />
        ) : proExists ? (
          products.map((element) => (
            <Product
              key={element._id}
              id={element._id}
              name={element.name}
              price={element.price}
              imageURL={element.image}
              products={products}
              addProducts={setProducts}
            />
          ))
        ) : (
          <span className="text-3xl text-center col-span-full">No Products Exist</span>
        )}
      </div>
    </div>
  );
};

export default HomePage;

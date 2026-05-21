import { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://task-manager-app-kjwe.onrender.com/api/products"
      );

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        E-Commerce Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white p-5 rounded-xl shadow-lg"
          >

            <img
              src={product.image}
              alt={product.name}
              className="h-52 w-full object-cover rounded-lg"
            />

            <h2 className="text-2xl font-bold mt-4">
              {product.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {product.description}
            </p>

            <p className="text-green-600 font-bold text-xl mt-4">
              ₹ {product.price}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Products;
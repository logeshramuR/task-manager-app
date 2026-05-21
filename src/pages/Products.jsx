import { useState } from "react";

function Products() {
  const [cart, setCart] = useState([]);

  const products = [
    {
      name: "iPhone 15",
      price: "₹79,999",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
    {
      name: "Laptop",
      price: "₹55,000",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    },
    {
      name: "Headphones",
      price: "₹2,999",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(product.name + " added to cart");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600">
          E-Commerce Products
        </h1>

        <div className="bg-blue-600 text-white px-5 py-2 rounded-lg">
          Cart: {cart.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-5"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-52 object-cover rounded-lg"
            />

            <h2 className="text-2xl font-semibold mt-4">
              {product.name}
            </h2>

            <p className="text-green-600 text-xl mt-2">
              {product.price}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
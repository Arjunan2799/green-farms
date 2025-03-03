import React from "react";
import { useSelector } from "react-redux";

const ProductCard = ({
  item,
  addProductCart,
  handleDecreseQuantity,
  handleIncreaseQuantity,
}) => {
  const cartProducts = useSelector((state) => state.cart.items);
  const currentProduct = cartProducts.filter(
    (product) => item.id === product?.product_id?._id
  );
  console.log("currentProducttttttttttt", currentProduct);
  const currentProductCount = currentProduct[0]?.qty;
  return (
    <div key={item.id} className="p-2">
      <div className="w-full flex flex-col bg-white rounded-lg shadow-md mb-4">
        <img
          src={"/assets/grass.png"}
          className="w-full h-32 md:h-44 object-cover rounded-lg"
          alt={item.name}
        />

        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <span className="font-semibold">{item.name}</span>
            <span className="text-gray-500">₹{item.price}</span>
          </div>

          {currentProductCount > 0 ? (
            <div className="flex items-center bg-green-200 gap-2 border-opacity-55 border-lime-300 rounded-lg ">
              <button
                onClick={() => {
                  console.log("decreased");
                  handleDecreseQuantity(item.id);
                }}
                className="px-2 py-1 bg-green-200 rounded"
              >
                -
              </button>
              <span>{currentProductCount}</span>
              <button
                onClick={() => {
                  handleIncreaseQuantity(item.id);
                }}
                className="px-2 py-1 bg-green-200 rounded"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                addProductCart(item.id);
              }}
              className="px-3 py-2 bg-green-200 rounded-lg"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

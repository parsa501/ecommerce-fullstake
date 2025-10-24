import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotItems from "./NotItems";
import { addItem, clearCart, removeItem } from "../../Store/Slices/CartSlice";
import { HiOutlineTrash } from "react-icons/hi";

export default function Cart() {
  const navigate = useNavigate();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const cartLength = useSelector((state) => state.cart.items).length;

  if (items.length == 0) return <NotItems />;

  return (
    <>
      <div className="flex items-center justify-between px-[8%]">
        <div className="flex items-center gap-4 mt-9">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center border border-gray-300 rounded-full w-16 h-16 justify-center"
          >
            <FaChevronLeft className="text-xl" />
          </div>
          <span className="text-base sm:text-lg md:text-xl font-medium text-gray-800">
            Back
          </span>
        </div>
        <FiShare2 className="text-2xl" />
      </div>

      <div className="px-[6%] py-4">
        <h2 className="text-[60px] font-bold">My Cart</h2>
        <p className="text-[30px] text-black opacity-60">
          Let’s create your offount
        </p>

        <div className="mt-[60px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h3 className="text-[20px] font-bold">Number of Items :</h3>{" "}
              <span className="font-bold px-2.5 py-0.5 rounded-full bg-red-300">
                {cartLength}
              </span>
            </div>
            <button
              onClick={() => dispatch(clearCart())}
              className="text-gray-500 flex items-center cursor-pointer gap-2 hover:text-gray-700 transition"
            >
              ClearCart <HiOutlineTrash className="text-[24px]" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-6">
            <table className="w-full lg:w-3/5 mt-8 text-left border-collapse">
              <tbody className="flex flex-col gap-6">
                {items.map((item) => (
                  <tr
                    key={item.documentId}
                    className="flex flex-col lg:flex-row lg:items-center border-b border-gray-200 pb-6 lg:pb-2"
                  >
                    <td className="flex items-center gap-4 lg:w-2/5">
                      <img
                        src={
                          import.meta.env.VITE_BASE_FILE + item.images[0]?.url
                        }
                        alt={item.name}
                        className="w-20 h-20 lg:w-24 lg:h-24 object-fill rounded-md border-3 border-gray-300"
                      />
                      <span className="font-medium text-base lg:text-lg">
                        {item.name.split(" ").slice(0, 3).join(" ")}
                      </span>
                    </td>

                    <td className="mt-4 lg:mt-0 lg:w-1/5 text-sm">
                      <span className="text-blue-600 text-[16px] font-semibold">
                        ${(item.price * (1 - item.offer / 100)).toFixed(2)}
                      </span>
                      <span className="text-gray-400 line-through ml-2">
                        ${item.price.toFixed(2)}
                      </span>
                    </td>

                    <td className="mt-4 lg:mt-0 lg:w-1/5">
                      <div className="flex items-center justify-center w-[80px] gap-2 border border-gray-300 rounded  py-1">
                        <button
                          onClick={() => dispatch(removeItem(item.documentId))}
                          className="text-gray-600  py-1 rounded hover:bg-gray-100 transition"
                        >
                          −
                        </button>
                        <span className="font-semibold">
                          {item.cartQuantity}
                        </span>
                        <button
                          onClick={() => {
                            if (item.cartQuantity < item.quantity)
                              dispatch(addItem(item));
                          }}
                          disabled={item.cartQuantity >= item.quantity}
                          className={` py-1 rounded transition ${
                            item.cartQuantity >= item.quantity
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="mt-4 lg:mt-0 lg:w-1/5 text-sm flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[16px] font-semibold">
                          $
                          {(
                            item.cartQuantity *
                            (item.price * (1 - item.offer / 100))
                          ).toFixed(2)}
                        </span>
                        <span className="text-red-600 text-xs font-bold ml-2 bg-red-100 px-1 py-0.5 rounded-full">
                          -{item.offer}%
                        </span>
                      </div>
                      <button
                        onClick={() => dispatch(removeItem(item.documentId))}
                        className="text-gray-500 hover:text-gray-700 transition"
                      >
                        <HiOutlineTrash className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 lg:mt-0 w-full lg:w-2/5 flex justify-center">
              <div className="w-full bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">
                  Invoice
                </h3>

                <div className="flex justify-between">
                  <span>Total Items:</span>
                  <span>{cartLength}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total Without Discount:</span>
                  <span className="text-green-600 font-medium">
                    $
                    {items
                      .reduce(
                        (sum, itm) => sum + itm.price * itm.cartQuantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between font-medium">
                  <span>Total Discount:</span>
                  <span className="text-red-600">
                    - $
                    {items
                      .reduce(
                        (sum, itm) =>
                          sum +
                          (itm.cartQuantity * (itm.price * itm.offer)) / 100,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping Fee:</span>
                  <span className="font-medium">${cartLength * 10}.00</span>
                </div>

                <div className="flex justify-between font-bold text-indigo-600 text-lg">
                  <span>Total With Discount :</span>
                  <span>${(totalPrice + 10).toFixed(2)}</span>
                </div>

                <button className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-xl font-semibold hover:shadow-xl transition">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

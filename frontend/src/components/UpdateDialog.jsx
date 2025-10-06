import axios from "axios";
import { useRef } from "react";

const UpdateDialog = ({ updateDialog, setUpdateDialog, name, price, imageURL, id, products, addProducts }) => {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const imgRef = useRef(null);

  const handleUpdate = async () => {
    try {
      let API_BASE;
      if(process.env.NODE_ENV === "production") {
          API_BASE = "https://products-store-rtc9.onrender.com/";
      } else {
        API_BASE = "http://localhost:5000/";
      }
      const response = await axios.put(`${API_BASE}api/products/${id}`, {
        name: nameRef.current.value,
        price: priceRef.current.value,
        image: imgRef.current.value,
      },{
        headers: {
          authorization: localStorage.getItem("token")
        }
      });

      let index = products.findIndex((product) => product._id === id);
      let updatedProArr = [...products];
      let newResponse = await axios.get(`${API_BASE}api/products`,{
        headers: {
          authorization: localStorage.getItem("token")
        }
      });
      let newResponseArr = newResponse.data.data;
      let updatedProduct = newResponseArr.find((product) => product._id === id);
      updatedProArr[index] = updatedProduct;
      addProducts(updatedProArr);

      setUpdateDialog(false);
    } catch (e) {
      console.log(e.response?.data?.message || e.message);
    }
  };

  if (!updateDialog) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9998]"
      onClick={() => setUpdateDialog(false)}
    >
      <div
        className="bg-emerald-200 rounded-xl p-6 w-[300px] flex flex-col gap-4 z-[9999] transform transition-all duration-500 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={nameRef}
          type="text"
          defaultValue={name}
          className="border pl-2 p-2 rounded-[10px] focus:outline-none"
        />
        <input
          ref={priceRef}
          type="text"
          defaultValue={price}
          className="border pl-2 p-2 rounded-[10px] focus:outline-none"
        />
        <input
          ref={imgRef}
          type="text"
          defaultValue={imageURL}
          className="border pl-2 p-2 rounded-[10px] focus:outline-none"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={handleUpdate}
            className="border rounded-xl p-2 cursor-pointer bg-sky-400"
          >
            Update
          </button>
          <button
            onClick={() => setUpdateDialog(false)}
            className="border rounded-xl p-2 cursor-pointer bg-red-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateDialog;

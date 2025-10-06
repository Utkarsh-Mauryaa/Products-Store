import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import UpdateDialog from './UpdateDialog';
import { useState } from 'react';


const Product = ({name, price, imageURL, id, products, addProducts}) => {
    const [updateDialog, setUpdateDialog] = useState(false);
  return (
    <>
    {updateDialog? <UpdateDialog updateDialog={updateDialog} setUpdateDialog={setUpdateDialog} name={name} price={price} imageURL={imageURL} id={id} products={products} addProducts={addProducts}/>: ""}
    <div className={`bg-slate-700 text-white rounded-md min-[1165px]:w-[365px] min-[859px]:w-[380px] min-[526px]:w-[500px] min-[859px]:h-[385px] min-[526px]:h-[450px] w-[320px] m-auto transition duration-400 ease-in-out transform hover:scale-105 hover:origin-bottom`}>
        <img src={imageURL} className='min-[1165px]:w-[365px] min-[859px]:w-[380px] min-[526px]:w-[500px] min-[859px]:h-[278px] min-[526px]:h-[325px] rounded-md object-fit' />
        <div>
            <p className='m-2'>{name}</p>
            <p className='m-2'>{price}</p>
            <button className='cursor-pointer' onClick={() => {
                setUpdateDialog(!updateDialog);
            }}>
             <PencilSquareIcon className='w-5 m-2 transition-all duration-300 ease-in-out hover:drop-shadow-[0_0_15px_#22d3ee] hover:text-cyan-300'/>
            </button>
            <button className='cursor-pointer' onClick={async () => {
                try {
                    let API_BASE;
                    if(process.env.NODE_ENV === "production") {
                       API_BASE = "https://products-store-rtc9.onrender.com/";
                    } else {
                      API_BASE = "http://localhost:5000/";
                    }
                    const response = await axios.delete(`${API_BASE}api/products/${id}`,{
                        headers: {
                            authorization: localStorage.getItem("token")
                        }
                    });
                    let arr = products.filter((element) => element._id !== id);
                    addProducts(arr);
                    console.log(response.data);
                } catch (e) {
                    console.log(e.response.data.message);
                }
                
            }}>
                <TrashIcon className='w-5 m-2 transition-all duration-300 ease-in-out hover:drop-shadow-[0_0_15px_#22d3ee] hover:text-cyan-300'/>
            </button>
        </div>
    </div>
    </>
  )
}

export default Product
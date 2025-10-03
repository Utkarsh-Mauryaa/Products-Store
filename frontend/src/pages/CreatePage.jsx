import { useRef, useState } from 'react'
import axios from 'axios'
import Notif from '../components/Notif';
import {Link} from 'react-router-dom';
import SuccessDialog from '../components/SuccessDialog';



const CreatePage = ({notify, setNotify, addIcon, setAddIcon, success, setSuccess}) => {
  if(addIcon == true) {
    setAddIcon(false);
  }
  const myForm = useRef(null);
  const proName = useRef(null);
  const proPrice = useRef(null);
  const proImg = useRef(null);
  
  

  const addPro =  async (e) => {
    e.preventDefault();
    try {
      let API_BASE;
      if(process.env.NODE_ENV === "production") {
          API_BASE = "https://products-store-rtc9.onrender.com/";
      } else {
        API_BASE = "http://localhost:5000/";
      }
    const response = await axios.post(`${API_BASE}api/products`, {
      name: proName.current.value,
      price: proPrice.current.value,
      image: proImg.current.value
    });
    setSuccess(!success);
  } catch(e) {
    if(e.response.status === 400) {
      setNotify(!notify);
    } else {
      alert(e.response.data.message);
    }
    
  }
    proName.current.value = '';
    proPrice.current.value = '';
    proImg.current.value = '';
  }

  return (
    <div className={`text-center h-screen dark:text-sky-500`}>
      <div className='flex justify-center'>
        <Notif notify={notify} setNotify={setNotify}/>
      </div>
      <div className='flex justify-center'>
        <SuccessDialog success={success} setSuccess={setSuccess}/>
      </div>
      <p className="text-[40px] m-10">
        Create New Product
      </p>
      <div className="min-[548px]:w-[500px] w-[340px] m-auto">
        <form ref={myForm} onSubmit={addPro} className="min-[548px]:w-[500px] w-[340px] flex flex-col gap-3 m-auto">
          <input ref={proName} type="text" placeholder="Product Name" className={` min-[548px]:w-[500px] w-[340px] border-1 pl-2 pt-2 pb-2 rounded-[10px] focus:outline-none ${notify? "pointer-events-none": "pointer-events-auto"} ${success? "pointer-events-none":"pointer-events-auto"}`}/>
          <input ref={proPrice} type="text" placeholder="Price" className={` min-[548px]:w-[500px] w-[340px] border-1 pl-2 pt-2 pb-2 rounded-[10px] focus:outline-none ${notify? "pointer-events-none": "pointer-events-auto"} ${success? "pointer-events-none":"pointer-events-auto"}`}/>
          <input ref={proImg} type="text" placeholder="Image URL" className={` min-[548px]:w-[500px] w-[340px] border-1 pl-2 pt-2 pb-2 rounded-[10px] focus:outline-none ${notify? "pointer-events-none": "pointer-events-auto"} ${success? "pointer-events-none":"pointer-events-auto"}`}/>
          <button className={` min-[548px]:w-[500px] w-[340px] border-1 pl-2 pt-2 pb-2 bg-cyan-200 dark:bg-slate-900 cursor-pointer hover:drop-shadow-[0_0_15px_#00E3E3] transition duration-300 rounded-[10px] dark:text-sky-500 ${notify? "pointer-events-none": "pointer-events-auto"} ${success? "pointer-events-none":"pointer-events-auto"}`}>Add Product</button>
        </form>
      </div>
      <Link to='/' className={`${notify? "pointer-events-none": "pointer-events-auto"} ${success? "pointer-events-none":"pointer-events-auto"}`}>
      <button onClick={() => {
        setAddIcon(!addIcon);
      }}
      className={`m-13 border-1 p-4 bg-cyan-200 cursor-pointer hover:drop-shadow-[0_0_15px_#00E3E3] transition duration-300 rounded-[10px] dark:text-sky-500 dark:bg-slate-900 ${notify? "pointer-events-none": "pointer-events-auto"} ${success? "pointer-events-none":"pointer-events-auto"}`}>Go back</button>
      </Link>

    </div>
  )
}

export default CreatePage
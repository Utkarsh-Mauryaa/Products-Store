import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRef, useState } from 'react';



function App() {
  const divi = useRef(null);
  const [notify, setNotify] = useState(false);
  const [addIcon, setAddIcon] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const getBackgroundClass = () => {
    if (notify) {
      return isDark ? "bg-zinc-800" : "bg-zinc-700";
    }
    if(success) {
      return isDark ? "bg-zinc-800" : "bg-zinc-700";
    }
    return isDark ? "bg-slate-950" : "bg-gray-400";
  };
  
  return (
    <>
     <div ref={divi} className={` ${isDark ? 'dark' : ''} ${getBackgroundClass()} transition duration-300 ease-in-out min-h-screen`}>
      <BrowserRouter>
      <Navbar bodyElem={divi} addIcon={addIcon} setAddIcon={setAddIcon} isDark={isDark} setIsDark={setIsDark}/>
      <Routes>
        <Route path='/' element={<HomePage addIcon={addIcon} setAddIcon={setAddIcon}/>} />
        <Route path='/create' element={<CreatePage notify={notify} setNotify={setNotify} addIcon={addIcon} setAddIcon={setAddIcon} success={success} setSuccess={setSuccess}/>}/>
      </Routes>
      </BrowserRouter>
     </div>
    </>
  )
}

export default App
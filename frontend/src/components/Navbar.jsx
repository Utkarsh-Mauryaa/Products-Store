import { MoonIcon, ShoppingBagIcon, SquaresPlusIcon, SunIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";


const Navbar = ({addIcon, setAddIcon, isDark, setIsDark}) => {
  
  function toggleTheme() {
    setIsDark(!isDark);
  }
  
  return (
    <div className="flex justify-between">
      <div className="flex gap-4 dark:text-sky-500 text-3xl m-4">
       PRODUCT STORE
       <ShoppingBagIcon className="w-7 mb-2 transition-all duration-300 ease-in-out hover:drop-shadow-[0_0_15px_#22d3ee] hover:text-cyan-300"/>
      </div>
      <div className="flex gap-6 dark:text-sky-500 m-6">
        <button onClick={() => {
          setAddIcon(!addIcon);
        }}>
          {addIcon?<Link to="/create">
          <SquaresPlusIcon className="w-6 cursor-pointer dark:hover:drop-shadow-[0_0_15px_#22d3ee] transition-[all] duration-300 ease-in-out hover:drop-shadow-[0_0_15px_#FFFF2E] hover:text-cyan-300"/>
          </Link>: ''}
          </button>
        <button onClick={toggleTheme}>
          {!isDark ? <MoonIcon className="w-6 cursor-pointer hover:drop-shadow-[0_0_20px_#FFFF2E] transition duration-300 ease-in-out hover:text-cyan-300"/> :
          <SunIcon className="w-[26px] cursor-pointer hover:drop-shadow-[0_0_15px_#22d3ee] transition duration-400 ease-in-out hover:text-cyan-300"/>}
        </button>
      </div>
    </div>
  )
}

export default Navbar

const Notif = ({notify, setNotify}) => {
  return (
    <div className={`fixed border-2 rounded-xl dark:bg-zinc-900 transform ${notify? "scale-110 p-4 z-[9999] bg-emerald-200": "scale-0 p-2"} transition-all duration-900 ease-in-out`}>
      <p className='m-2'>
        ❌ Invalid input, please fill all the fields!
      </p>
      <button onClick={() => {
        setNotify(!notify);
      }} className='border-2 rounded-xl p-[5px] cursor-pointer bg-sky-400 dark:bg-gray-950 w-15'>Okay</button>
    </div>
  )
}

export default Notif
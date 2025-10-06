import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const inName = useRef();
    const inEmail = useRef();
    const inPass = useRef();
    const navigate = useNavigate();
    async function signup(e) {
        e.preventDefault();
        try {
            let API_BASE;
            if (process.env.NODE_ENV === "production") {
                API_BASE = "https://products-store-rtc9.onrender.com/";
            } else {
                API_BASE = "http://localhost:5000/";
            }
            const response = await axios.post(`${API_BASE}api/users/signup`, {
                username: inName.current.value,
                email: inEmail.current.value,
                password: inPass.current.value
            });
            toast.success(`${response.data.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                onClose: () => {
                    navigate("/create");
                }
            });
            localStorage.setItem("token", response.data.token);


        } catch (e) {
            toast.error(`${e.response.data.message}`, {
                position: "top-right",   // top-left, top-center, bottom-right, etc.
                autoClose: 3000,         // 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored"         // light, dark, colored
            });
        }

    }
    return (
        <div className="flex justify-center font-sans dark:text-sky-500">
            <div className="border-2 flex flex-col min-[367px]:w-[450px] w-[400px] m-10 rounded-xl">
                <div className="m-2">
                    <ShoppingCartIcon className="relative top-4 w-19 text-violet-900 cursor-pointer hover:drop-shadow-[0_0_20px_#06b6d4] transition duration-300 ease-in-out hover:text-cyan-300 m-auto" style={{ fill: "#06b6d4" }} />
                </div>
                <div className="m-8 flex flex-col gap-2">
                    <p className="font-bold text-3xl text-center">Sign Up</p>
                    <p className="m-auto text-center text-md">Join us today and get started!</p>
                </div>
                <div className="flex justify-center">
                    <form onSubmit={signup} className="flex flex-col gap-3">
                        <input type="text" placeholder="Full Name" className="min-[367px]:w-[350px] w-[300px] border-2 rounded-xl p-2 focus:outline-none" ref={inName} />
                        <input type="text" placeholder="Email Address" className="min-[367px]:w-[350px] w-[300px] border-2 rounded-xl p-2 focus:outline-none" ref={inEmail} />
                        <input type="text" placeholder="Password" className="min-[367px]:w-[350px] w-[300px] border-2 rounded-xl p-2 focus:outline-none" ref={inPass} />
                        <button className="border-2 rounded-xl font-medium h-[46px] cursor-pointer text-xl">Create Account</button>
                        <p className="text-center p-2">
                            Already have an account?{<Link to='/signin' className="font-medium"> Sign In</Link>}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
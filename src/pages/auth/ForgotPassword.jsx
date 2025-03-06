import { toast } from "react-toastify";
import triangle from "../../assets/images/auth/triangle.svg";

const ForgotPassword = () => {

 

    return (
        <section id="auth_banner" className="flex items-center justify-start min-h-screen bg-gray-100">
            <div className="flex items-start w-full p-8 mx-4">
                <div className="w-full max-w-lg">
                    <div className="flex items-center gap-2 ml-[-3rem] md:ml-[-2rem] mb-4">
                        <img src={triangle} alt="" className='w-7 md:w-auto' />
                        <h2 className="text-3xl text-gray-800 font-semibold textColor">Forgot Password?</h2>
                    </div>
                    <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
                        <div className="relative">
                            <label className="text-gray-800 mb-1 block" htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-[#FFFFFF] border-[1px] border-[#00000040]"
                            />
                        </div>

                        <div className="flex items-center justify-start">
                            <div className="text-sm">
                                <p className="text-purple-600 ">
                                    Want to get code on mobile number?
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full py-4 text-sm tracking-wide text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 font-bold"
                            >
                                Get Code
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;

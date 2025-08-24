import { useForm } from "react-hook-form";

export default function Register() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    alert(`Thanks for registering, ${data.name}!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white flex flex-col md:flex-row w-full max-w-5xl shadow-xl overflow-hidden">
        
        {/* Left Side - Branding with gradient animation */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-700 animate-gradient text-white">
          <h1 className="text-4xl font-extrabold mb-4 tracking-wide text-center">
            <span className="animated-text">WELCOME</span>{" "}
            <span className="animated-text-red">TO</span>{" "}
            <span className="animated-text">LOGDY</span>
          </h1>
          <p className="text-gray-200 text-center">
            Register today and be part of the biggest startup conference.  
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <button className="bg-white/20 hover:bg-white/40 p-3 rounded-full">F</button>
            <button className="bg-white/20 hover:bg-white/40 p-3 rounded-full">T</button>
            <button className="bg-white/20 hover:bg-white/40 p-3 rounded-full">G</button>
            <button className="bg-white/20 hover:bg-white/40 p-3 rounded-full">in</button>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />

            {/* Email */}
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />

            {/* Phone */}
            <input
              {...register("phone")}
              type="text"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
            />

            {/* Ticket Type */}
            <select
              {...register("ticket", { required: true })}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Select Ticket</option>
              <option value="standard">Standard</option>
              <option value="vip">VIP</option>
              <option value="premium">Premium</option>
            </select>

            {/* Message */}
            <textarea
              {...register("message")}
              placeholder="Message"
              rows="3"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Register
            </button>
          </form>

          {/* Already Have Account */}
          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-pink-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

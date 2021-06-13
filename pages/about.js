import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaLaptop, FaTwitter } from "react-icons/fa";

function about() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <div className="max-w-2xl pt-20 pb-32 px-6 text-center mx-auto">
        <div className="h-64 w-full justify-center flex">
          <img src="/about.png" className="h-64" />
        </div>
        <h2 className="text-3xl font-semibold text-gray-700 py-4">
          Hi,{" "}
          <span className="bg-indigo-400 text-white rounded px-1">
            I’m Soumyajit
          </span>{" "}
          . Nice to meet you.
        </h2>
        <p className="text-gray-600 mt-4">
          I am a self taught developer currently pursuing IMSC in Maths and
          Computing in BIT Mesra. My field of Interest's are building new Web
          Technologies and Products and also in areas related to Deep Learning
          and Natural Launguage Processing.
        </p>

        <div className="text-center pt-8">
          <button className="bg-indigo-500 px-3 py-1 font-semibold text-white inline-flex items-center space-x-2 rounded">
            <FaLaptop />
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://soumyajit.tech/"
            >
              See My Works
            </a>
          </button>

          <button className="bg-indigo-500 px-3 py-1 font-semibold text-white inline-flex items-center space-x-2 rounded ml-3">
            <FaTwitter />
            <a
              className="twitter-follow-button"
              rel="noopener noreferrer"
              target="_blank"
              href="https://twitter.com/soumyajit4419"
            >
              Follow Me
            </a>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default about;

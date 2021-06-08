import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function about() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-2xl pt-32 pb-32 px-6 text-center mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800">
          Hi,{" "}
          <span className="bg-indigo-500 text-white rounded px-1">
            I’m Soumyajit 
          </span>{" "}
          . Nice to meet you.
        </h2>
        <p className="text-gray-600 mt-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. A aliquam
          veniam suscipit eaque iure, eligendi harum expedita cupiditate sequi,
          culpa autem! Quaerat ex fugit iste suscipit reiciendis, accusamus
          ipsum quae.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default about;

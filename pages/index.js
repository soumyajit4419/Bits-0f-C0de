import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <Header />

      <div className="container px-5 py-12 mx-auto overflow-hidden">
        <div className="flex flex-wrap">
          <div className="p-8 md:w-1/2 flex flex-col items-start">
            <span className="inline-block py-1 px-2 rounded bg-purple-50 text-indigo-600 text-xs font-medium tracking-widest">
              CATEGORY
            </span>
            <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-800 mt-4 mb-4">
              Roof party normcore before they sold out, cornhole vape
            </h2>
            <p className="leading-relaxed mb-8 text-gray-600">
              Live-edge letterpress cliche, salvia fanny pack humblebrag narwhal
              portland. VHS man braid palo santo hoodie brunch trust fund.
              Bitters hashtag waistcoat fashion axe chia unicorn. Plaid fixie
              chambray 90's, slow-carb etsy tumeric. Cray pug you probably
              haven't heard of them hexagon kickstarter craft beer pork chic.
            </p>
            <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-200 mt-auto w-full justify-between">
              <a className="text-indigo-500 inline-flex items-center">
                Learn More{" "}
                <span className="pl-1">
                  <AiOutlineArrowRight />
                </span>
              </a>
              <a className="inline-flex items-center">
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-900">
                    Author
                  </span>
                  <span className="text-gray-400 text-xs tracking-widest mt-0.5">
                    Soumyajit Behera
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="p-8 md:w-1/2 flex flex-col items-start">
            <span className="inline-block py-1 px-2 rounded bg-purple-50 text-indigo-600 text-xs font-medium tracking-widest">
              CATEGORY
            </span>
            <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-800 mt-4 mb-4">
              Pinterest DIY dreamcatcher gentrify single-origin coffee
            </h2>
            <p className="leading-relaxed mb-8 text-gray-600">
              Live-edge letterpress cliche, salvia fanny pack humblebrag narwhal
              portland. VHS man braid palo santo hoodie brunch trust fund.
              Bitters hashtag waistcoat fashion axe chia unicorn. Plaid fixie
              chambray 90's, slow-carb etsy tumeric.
            </p>

            <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-200 mt-auto w-full justify-between">
              <a className="text-indigo-500 inline-flex items-center">
                Learn More{" "}
                <span className="pl-1">
                  <AiOutlineArrowRight />
                </span>
              </a>
              <a className="inline-flex items-center">
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-900">
                    Author
                  </span>
                  <span className="text-gray-400 text-xs tracking-widest mt-0.5">
                    Soumyajit Behera
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="p-8 md:w-1/2 flex flex-col items-start">
            <span className="inline-block py-1 px-2 rounded bg-purple-50 text-indigo-600 text-xs font-medium tracking-widest">
              CATEGORY
            </span>
            <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-800 mt-4 mb-4">
              Pinterest DIY dreamcatcher gentrify single-origin coffee
            </h2>
            <p className="leading-relaxed mb-8 text-gray-600">
              Live-edge letterpress cliche, salvia fanny pack humblebrag narwhal
              portland. VHS man braid palo santo hoodie brunch trust fund.
              Bitters hashtag waistcoat fashion axe chia unicorn. Plaid fixie
              chambray 90's, slow-carb etsy tumeric.
            </p>

            <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-200 mt-auto w-full justify-between">
              <a className="text-indigo-500 inline-flex items-center">
                Learn More{" "}
                <span className="pl-1">
                  <AiOutlineArrowRight />
                </span>
              </a>
              <a className="inline-flex items-center">
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-900">
                    Author
                  </span>
                  <span className="text-gray-400 text-xs tracking-widest mt-0.5">
                    Soumyajit Behera
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

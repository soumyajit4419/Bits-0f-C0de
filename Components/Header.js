function Header() {
  return (
    <div className="pt-24 px-12 mx-auto max-w-7xl">
      <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
        <h1 className="mb-8 text-4xl font-bold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight dark:text-gray-50">
          <span>Explore</span>{" "}
          <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-400 to-purple-500 lg:inline">
            Learn
          </span>{" "}
          <span>Build 🚀</span>
        </h1>

        <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24 dark:text-gray-400">
          I am self-taught developer trying to learn new technologies and
          sharing my experiences and knowledge
        </p>
      </div>
    </div>
  );
}

export default Header;

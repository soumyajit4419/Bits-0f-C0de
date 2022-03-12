function Header({ topic, topicName, topicCount }) {
  return (
    <>
      {topic && (
        <div className="pt-24 px-12 mx-auto">
          <div className="px-0.5 md:px-7 pt-6 mx-auto flex justify-between">
            <h3 className="text-2xl font-bold">{topicName}</h3>

            <h4 className="text-xl">{topicCount} Articles</h4>
          </div>
        </div>
      )}

      {!topic && (
        <div className="pt-24 px-12 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <p className="px-0 mb-2 text-lg font-bold text-gray-800 md:text-xl lg:px-24 dark:text-gray-300">
              Bits-0f-C0de
            </p>

            <h1 className="mb-8 text-4xl font-bold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight dark:text-gray-50">
              <span>Explore</span>{" "}
              <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-400 to-purple-500 lg:inline">
                Learn
              </span>{" "}
              <span>Build 🚀</span>
            </h1>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;


const Skeletun = () => {
  
  return (
    <div className="animate-pulse p-10">
      {/* Navbar */}
      <div className="h-16 bg-gray-500 w-full mb-4"></div>

      <div className="flex space-x-4 items-center justify-center flex-col">
        <div className="h-6 bg-gray-400 rounded w-1/2 my-5"></div>
        <div className="w-3/4 space-y-4">
          <div className="h-40 bg-gray-400 rounded"></div>
          <div className="h-40 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeletun;
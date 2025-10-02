const LoadingCircle = () => {
  return (
    <div className="flex justify-center items-center relative left-[500px] top-[5px]">
      <div className="relative top-[170px] w-18 h-18 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingCircle;
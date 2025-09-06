const SkeletonLoader = () => {
  return (
    <>
      <div className="flex animate-pulse bottom-0 overflow-hidden">
        <div className="flex-1">
          <div className="space-y-6 p-4 bg-white shadow rounded-md">
            <div className="bg-gray-300 h-12 rounded-md"></div>

            <div className="space-y-4">
              <div className="bg-gray-200 h-3 rounded-md"></div>
              <div className="flex justify-between">
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
              </div>
              {/* <div className="bg-gray-200 h-4 rounded-md"></div> */}
              <div className="bg-gray-200 h-3 rounded-md w-[500px]"></div>
              <div className="flex justify-between">
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
              </div>
              <div className="bg-gray-200 h-3 rounded-md"></div>
              <div className="flex justify-between">
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
              </div>
              <div className="bg-gray-200 h-[14px] rounded-md"></div>
              {/* <div className="flex justify-between">
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
                <div className="bg-gray-200 h-4 rounded-md w-[120px]"></div>
              </div>
              <div className="bg-gray-200 h-4 rounded-md"></div> */}
            </div>
          </div>
          {/* <div className="space-y-6 p-4 bg-white shadow rounded-md w-[180px]">
          <div className="flex">
              <div className="h-8 w-[70px] bg-gray-300"></div>
              <div className="h-8 w-[30px] bg-gray-400"></div>
              <div className="h-8 w-[70px] bg-gray-300"></div>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
};

export { SkeletonLoader };

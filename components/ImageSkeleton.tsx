export const ImageSkeleton = () => {
  return (
    <div className="max-w-md mx-auto px-4 pt-4 pb-8 flex flex-col bg-white shadow-inner drop-shadow-xl">
      <div className="relative flex flex-col justify-center items-center gap-y-2 w-[510px] border border-gray-300 rounded shadow group p-2 mx-auto animate-pulse bg-gray-400 aspect-square max-w-full" />

      <div className="flex flex-col gap-4 pt-4">
        <p className="text-center text-lg">generating</p>
        {/* <p className='text-center text-lg'>{time}</p> */}
      </div>
    </div>
  );
};

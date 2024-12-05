import config from "@/config";

const MomentsHeader = () => {
  return (
    <div
      className="min-h-[300px] sm:h-[300px] h-[54.7vw] w-full bg-cover relative sm:mt-1 sm:rounded-md"
      style={{ backgroundImage: `url(${config.bg})`, backgroundPosition: "center" }}
    >
      <div className="absolute flex flex-col items-end w-full right-[1.5rem] bottom-[-0.875rem]">
        <div className="flex flex-row items-center gap-[1rem]">
          <p className="text-base text-white">{config.name}</p>
          <img src={config.avatar} alt="avatar" className="w-[3.75rem] h-[3.75rem] rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default MomentsHeader;

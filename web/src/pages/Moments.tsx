import MomentsContent from "@/components/moments/content";
import MomentsHeader from "@/components/moments/header";

const Moments = () => {
  return (
    <section className="w-screen h-screen flex flex-col items-center overflow-y-auto hide-scrollbar">
      {/* 屏幕大于 640px 时，显示 550px 宽度 ，否则显示 100% */}
      <div className={"w-full sm:w-[550px] h-auto flex flex-col"}>
        <MomentsHeader />
        <MomentsContent />
      </div>
    </section>
  );
};

export default Moments;

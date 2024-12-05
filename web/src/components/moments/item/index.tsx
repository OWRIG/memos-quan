import config from "@/config";
import { Memo } from "@/types/proto/api/v1/memo_service";
import MomentsRender from "../render";
import MomentsResource from "../resource";

const MomentsItem = (props: { memo: Memo }) => {
  const { memo } = props;
  const nodes = memo?.nodes || [];
  return (
    <div className="flex flex-row w-full gap-[0.875rem] pt-[1.875rem] px-[1.5rem]">
      <img src={config.avatar} alt="avatar" className="w-8 h-8 rounded-md shadow-sm mb-1" />
      <div className="w-full flex flex-col">
        <p className="text-sm text-[#5b6f92]">{config.name}</p>
        {nodes?.map((node, index) => <MomentsRender key={node.type + index} index={index} node={node} />)}
        <MomentsResource resource={memo.resources} />
        <div className="text-xs text-[#d7d7d7] mt-3">
          <relative-time datetime={memo.displayTime?.toISOString()} format={"auto"}></relative-time>
        </div>
        <p className="h-[1px] bg-[#F5F5F5] w-full mt-4" />
      </div>
    </div>
  );
};

export default MomentsItem;

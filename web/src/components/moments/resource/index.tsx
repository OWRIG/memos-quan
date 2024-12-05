import clsx from "clsx";
import showPreviewImageDialog from "@/components/PreviewImageDialog";
import { Resource } from "@/types/proto/api/v1/resource_service";
import { getResourceType, getResourceUrl } from "@/utils/resource";

const Media = ({
  resource,
  handleImageClick,
  isSingle,
}: {
  resource: Resource;
  handleImageClick: (imgUrl: string) => void;
  isSingle?: boolean;
}) => {
  const type = getResourceType(resource);
  const resourceUrl = getResourceUrl(resource);

  if (type === "image/*") {
    // 宽度自适应，高度和宽度一致
    return (
      <div className="cursor-pointer grid place-items-center" onClick={() => handleImageClick(resourceUrl)}>
        <img
          className={clsx("object-cover", !isSingle && "aspect-square")}
          src={resource.externalLink ? resourceUrl : resourceUrl + "?thumbnail=true"}
          decoding="async"
          loading="lazy"
        />
      </div>
    );
  } else if (type === "video/*") {
    return (
      <video
        className="cursor-pointer w-auto h-full object-contain bg-zinc-100 dark:bg-zinc-800"
        preload="metadata"
        crossOrigin="anonymous"
        src={resourceUrl}
        controls
      />
    );
  } else {
    return <></>;
  }
};

const MomentsResource = (props: { resource: Resource[] }) => {
  const { resource } = props;
  const handleImageClick = (imgUrl: string) => {
    const imgUrls = resource.filter((res) => getResourceType(res) === "image/*").map((res) => getResourceUrl(res));
    const index = imgUrls.findIndex((url) => url === imgUrl);
    showPreviewImageDialog(imgUrls, index);
  };

  if (resource.length === 0) {
    return <></>;
  }

  if (resource.length === 1) {
    return <Media resource={resource[0]} handleImageClick={handleImageClick} isSingle />;
  }

  if (resource.length === 4) {
    return (
      <div className="grid grid-cols-2 gap-2 mt-2">
        {resource.map((res, index) => (
          <Media key={index} resource={res} handleImageClick={handleImageClick} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {resource.map((res, index) => (
        <Media key={index} resource={res} handleImageClick={handleImageClick} />
      ))}
    </div>
  );
};

export default MomentsResource;

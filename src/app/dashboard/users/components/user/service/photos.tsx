import NoData from "@/app/_components/table/NoData";
import { generateImagePairs } from "@/v2/helpers/common.helpers";
import { BusinessProfile } from "@/v2/types/service.types";
import Image from "next/image";
import { ReactNode, useMemo } from "react";

const generateImageArray = () => {
  const imageArray = [];

  for (let i = 0; i < 5; i++) {
    const imageObject = {
      id: `E6nG6hDT2iNmfT0r2cz0${i}`,
      url: `https://res.cloudinary.com/digital-specie/image/upload/v1697574653/uobf4tjed3hkfxfm05bg.jpg`,
      fileType: "image",
    };

    const jsonString = JSON.stringify(imageObject);
    imageArray.push(jsonString);
  }

  return imageArray;
};

const Block = ({
  w = 100,
  condition = true,
  children,
}: {
  w: number;
  condition?: boolean;
  children?: ReactNode;
}) => {
  return (
    condition && (
      <div
        style={{
          width: `${w}%`,
        }}
        className={`block bg-gray-400 rounded-[20px] h-[100%] overflow-clip`}
      >
        {children}
      </div>
    )
  );
};

const Photos = ({ data: service }: { data: BusinessProfile }) => {
  const images = useMemo(() => {
    const dummyImages = Array.from({ length: 0 }, () => service.avatar);
    const mainImages = service?.businessImages || [];

    const returnImages = dummyImages.concat(mainImages);
    const imagesWithDimensions = generateImagePairs(returnImages);
    return imagesWithDimensions;
  }, [service]);

  return images.length > 0 ? (
    <div className="mt-2 w-[100%] grid gap-2">
      {images.map((imageSet, index) => (
        <div
          key={index}
          className="flex items-center gap-2 justify-between w-[100%] h-[100px]"
        >
          {imageSet.map((image, index) => (
            <Block key={index} w={image.percentage} condition={!!image.url}>
              <Image
                className="w-full h-full object-cover"
                alt={"lol"}
                src={image.url}
                width={200}
                height={100}
              />
            </Block>
          ))}
        </div>
      ))}
    </div>
  ) : (
    <NoData
      title="No Photos Yet."
      description="All Photos get listed here."
    />
  );
};

export default Photos;

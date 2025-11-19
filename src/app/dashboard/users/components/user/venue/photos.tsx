import Image from "next/image";
import { useState, ReactNode, useEffect } from "react";

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

const Photos = ({ venue }: { venue: any }) => {
  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    const venueImages = (venue.images).map((image: any) => {
      return JSON.parse(image);
    });
    setImages(venueImages);
  }, [venue]);


  return (
    images.length > 0 && (
      <div className="mt-2 w-[100%] grid gap-2">
        <div className="flex items-center gap-2 justify-between w-[100%] h-[100px]">
          <Block w={60} condition={Boolean(images[0])}>
            <Image
              className="w-full h-full"
              alt={"lol"}
              src={images[0]?.url}
              width={200}
              height={100}
            />
          </Block>
          <Block w={40} condition={Boolean(images[1])}>
            <Image
              className="w-full h-full"
              alt={"lol"}
              src={images[1]?.url}
              width={200}
              height={100}
            />
          </Block>
        </div>
        <div className="flex items-center gap-2 justify-between w-[100%] h-[100px]">
          <Block w={40} condition={Boolean(images[2])}>
            <Image
              className="w-full h-full"
              alt={"lol"}
              src={images[2]?.url}
              width={200}
              height={100}
            />
          </Block>
          <Block w={60} condition={Boolean(images[3])}>
            <Image
              className="w-full h-full"
              alt={"lol"}
              src={images[3]?.url}
              width={200}
              height={100}
            />
          </Block>
        </div>
        <div className="flex items-center gap-2 justify-between w-[100%] h-[100px]">
          <Block w={100} condition={Boolean(images[4])}>
            <Image
              className="w-full h-full"
              alt={"lol"}
              src={images[4]?.url}
              width={200}
              height={100}
            />
          </Block>
        </div>
      </div>
    )
  );
};

export default Photos;

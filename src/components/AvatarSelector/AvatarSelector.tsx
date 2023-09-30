'use client';

import { CameraIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import avatar from "@/images/avatar.png"

interface Props {
  setFile: any;
  defaultImage?: string;
}

const AvatarSelector = ({ setFile, defaultImage }: Props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(avatar?.src);

  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    }
  }, [defaultImage]);

  const handleImageChange = (e: any) => {
    const file = e?.target?.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  useEffect(() => {
    setFile(selectedFile);
  }, [selectedFile]);

  return (
    <div className="w-full relative overflow-hidden h-full rounded-full border-gray-300 shadow-md">
      <label
        className="w-full h-auto cursor-pointer p-2 bg-black/50 absolute bottom-0 flex items-center justify-center"
        htmlFor="fileSelect"
      >
        <CameraIcon color="white" width={30} />
      </label>
      <img
        src={preview}
        alt="User Image"
        className="w-full h-full rounded-full object-cover"
      />
      <input
        id="fileSelect"
        onChange={handleImageChange}
        name="fileSelect"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        className="hidden"
      />
    </div>
  );
};

export default AvatarSelector;

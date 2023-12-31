import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import Avatar from "@/shared/Avatar/Avatar";
import FiveStartIconForRate from "./FiveStartIconForRate";

interface ReviewItemDataType {
  name: string;
  avatar?: string;
  // date: string;
  comment: string;
  starPoint: number;
}

export interface ReviewItemProps {
  className?: string;
  data?: ReviewItemDataType;
}

const DEMO_DATA: ReviewItemDataType = {
  name: "Cody Fisher",
  comment:
    "Very nice feeling sweater. I like it better than a regular hoody because it is tailored to be a slimmer fit. Perfect for going out when you want to stay comfy. The head opening is a little tight which makes it a little.",
  starPoint: 5,
};

const ReviewItem: FC<ReviewItemProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div
      className={`nc-ReviewItem flex flex-col ${className}`}
      data-nc-id="ReviewItem"
    >
      <div className=" flex space-x-4 ">
        <div className="flex-shrink-0 pt-0.5">
          <Avatar
            sizeClass="h-10 w-10 text-lg"
            radius="rounded-full"
            userName={data.name}
            imgUrl={data.avatar}
          />
        </div>

        <div className="flex-1 flex justify-between">
          <div className="text-sm sm:text-base">
            <span className="block font-semibold">{data.name}</span>
          </div>

          <div className="mt-0.5 flex items-center gap-1 text-yellow-500">
            <FiveStartIconForRate
              withHover={false}
              defaultPoint={data.starPoint}
            />
            <span className="text-sm text-gray-600">{`(${data.starPoint})`}</span>
          </div>
        </div>
      </div>
      {data.comment.trim() !== "" && (
        <div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
          <p className="text-slate-600 dark:text-slate-300">{data.comment}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;

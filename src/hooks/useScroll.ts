import { useGlobalActions } from "@/store/slices/GlobalSlice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const useScroll = () => {
  const scrollToTop = () => {
    const scrollItem = document.getElementById("scrollItem");
    if (scrollItem) {
      scrollItem.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return {
    scrollToTop,
  };
};

export default useScroll;

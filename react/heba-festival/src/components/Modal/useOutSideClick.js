import { useEffect } from "react";

function useOutSideClick(ref, callback) {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback?.();
      }
    };

    const handleOutsideClick = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }

      e.stopPropagation(); // 클릭 이벤트의 버블링 중지

      const { pageX, pageY } = e;
      const { top, bottom, left, right } = ref.current.getBoundingClientRect();

      if (pageX < left || pageX > right || pageY < top || pageY > bottom) {
        callback?.();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [ref, callback]);
}

export default useOutSideClick;

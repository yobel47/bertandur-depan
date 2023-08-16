import React from "react";
import { Loading } from "../../assets";
import lottie from "lottie-web";

function LoadingModal(props) {
  const animation = React.useRef(null);
  React.useEffect(() => {
    lottie.loadAnimation({
      container: animation.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: Loading,
    });
    return () => lottie.stop();
  }, []);
  return (
    <div
      tabIndex="-1"
      className={`${props.styles} ${
        props.loading ? "visible" : "hidden "
      } transition ease-in-out duration-1000 delay-500 flex items-center justify-center overflow-y-hidden overflow-x-hidden fixed top-0 bg-opacity-50 bg-white right-0 left-0 bottom-0 md:inset-0 h-modal md:h-full`}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-full flex">
        <div ref={animation}></div>
      </div>
    </div>
  );
}

export default LoadingModal;

const ImageAuth = (props) => {
  return (
    <div className="w-full mx-auto  flex-shrink justify-center lg:max-w-7xl bg-[#7CBD1E]/20 md:flex hidden">
      <div className="flex justify-center">
        <img className="h-100" fill="black" src={props.image} alt="" />
      </div>
    </div>
  );
};

export default ImageAuth;

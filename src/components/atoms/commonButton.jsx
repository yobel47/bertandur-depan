const CommonButton = (prop) => {
  const primary = "text-white text-lg bg-tandur hover:bg-tandur/70 active:bg-tandur/90 focus:outline-none disabled:bg-tandur/70";
  const secondary =
    "text-gray-400 text-lg bg-white border-2 border-gray-400 hover:bg-gray-100 active:bg-gray-300 active:text-gray-600 focus:outline-none disabled:bg-gray-300";
  return (
    <button
      type={prop.type}
      disabled={!prop.disabled}
      onClick={prop.onClick}
      onSubmit={prop.onSubmit}
      className={`${prop.customStyle} ${prop.theme == "secondary" ? secondary : primary} w-full my-8 py-2 rounded-2xl `}
    >
      {prop.title}
    </button>
  );
};

export default CommonButton;

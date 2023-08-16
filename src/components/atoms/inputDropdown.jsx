import React from "react";

const InputDropdown = (prop) => {
  const title = prop.title;
  const id = prop.id;

  const [placehold, setPlacehold] = React.useState(`${prop.placeholder && "text-[#94A3B8]"}`);

  const onSelect = (e) => {
    prop.onChange(e);
    setPlacehold("text-black");
  };

  return (
    <div className="relative">
      <select
        placeholder={prop.placeholder}
        name={prop.name}
        id={prop.name}
        value={prop.value}
        onChange={(e) => onSelect(e)}
        disabled={prop.disabled}
        className={`${placehold} ${prop.styles} mt-5 w-full px-3 py-3 text-md border-b-2 placeholder-slate-400
                        focus:outline-none  focus:ring-tandur
                        disabled:text-slate-400  disabled:border-slate-300 
                        ${prop.error ? "focus:border-pink-500 border-pink-500" : "focus:border-b-tandur border-b-slate-400"}`}
      >
        {prop.placeholder && (
          <option value="title" hidden>
            {prop.placeholder}
          </option>
        )}
        {prop.data.map((val) => (
          <option className="text-black" value={val[id]} key={val[id]}>
            {val[title]}
          </option>
        ))}
      </select>
      {prop.error && <p className="text-pink-500 pt-2 pl-2">{prop.message}</p>}
    </div>
  );
};

export default InputDropdown;

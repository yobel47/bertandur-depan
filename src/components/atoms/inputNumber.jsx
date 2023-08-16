import React from "react";

const InputNumber = (prop) => {
  const format = (e) => {
    if (e.target.value == "" || e.target.value == "0" || e.target.value == null) {
      prop.onChange("");
    } else if (!/^\d+$/.test(e.target.value)) {
    } else {
      prop.onChange(e.target.value);
    }
  };

  return (
    <div className="relative">
      <input
        type={"text"}
        placeholder={prop.placeholder}
        value={prop.value}
        onChange={(e) => (prop.type !== "float" ? format(e) : prop.onChange(e))}
        onBlur={(e) => {
          if (e.target.value == "") prop.onChange("0");
          prop.onBlur(e);
        }}
        onClick={(e) => {
          if (e.target.value == "0") prop.onChange("");
        }}
        disabled={prop.disabled}
        className={`${prop.styles} mt-5 w-full px-3 py-3 text-md border-b-2 placeholder-slate-400
                        focus:outline-none  focus:ring-tandur
                        disabled:bg-white disabled:text-slate-400 disabled:rounded-md disabled:border-slate-300
                        ${prop.error ? "focus:border-pink-500 border-pink-500" : "focus:border-b-tandur border-b-slate-400"}`}
      />
      {prop.error && <p className="text-pink-500 pt-2 pl-2">{prop.message}</p>}
    </div>
  );
};

export default InputNumber;

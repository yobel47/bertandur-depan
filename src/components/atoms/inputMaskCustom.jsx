import React from "react";
import InputMask from "react-input-mask";

const InputMaskCustom = (prop) => {
  return (
    <div className="relative">
      <InputMask
        maskChar={null}
        mask={prop.mask}
        placeholder={prop.placeholder}
        value={prop.value}
        onChange={(e) => {
          prop.onChange(e);
        }}
        onBlur={prop.onBlur}
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

export default InputMaskCustom;

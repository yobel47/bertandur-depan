import React from "react";
import { currencyFormat } from "../../utils/currencyFormat";

const InputCurrency = (prop) => {
  const format = (e) => {
    if (e.target.value == "" || e.target.value == "Rp. 0" || e.target.value == null) {
      prop.onChange("Rp. ");
    } else {
      prop.onChange("Rp. " + currencyFormat(e.target.value));
    }
  };

  return (
    <div className="relative">
      <input
        type={prop.type}
        placeholder={prop.placeholder}
        value={prop.value}
        onChange={(e) => format(e)}
        onBlur={(e) => {
          if (e.target.value == "Rp. ") prop.onChange("Rp. 0");
          prop.onBlur(e);
        }}
        onClick={(e) => {
          if (e.target.value == "Rp. 0") prop.onChange("Rp. ");
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

export default InputCurrency;

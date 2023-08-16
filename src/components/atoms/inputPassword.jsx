import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const InputPassword = (prop) => {
  const [passwordShown, setPasswordShown] = useState(false);
  function passwordToggle() {
    setPasswordShown(!passwordShown);
  }
  return (
    <>
      <div className="relative">
        <input
          type={passwordShown ? "text" : "password"}
          placeholder={prop.placeholder}
          value={prop.value}
          onChange={prop.onChange}
          onBlur={prop.onBlur}
          className={`${prop.styles} mt-5 w-full pr-10 px-3 py-3 text-md border-b-2 placeholder-slate-400
                        focus:outline-none  focus:ring-tandur
                        disabled:bg-slate-100 disabled:text-slate-500 disabled:rounded-md disabled:border-slate-200
                        ${prop.error ? "focus:border-pink-500 border-pink-500" : "focus:border-b-tandur border-b-slate-400"}`}
        />
        <button type="button" className="absolute bottom-0 right-0 py-2 cursor-pointer text-3xl" onClick={passwordToggle}>
          {passwordShown ? <AiFillEyeInvisible /> : <AiFillEye />}
        </button>
      </div>
      {prop.error && <p className="text-pink-500 pt-2 pl-2">{prop.message}</p>}
    </>
  );
};

export default InputPassword;

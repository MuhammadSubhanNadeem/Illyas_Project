import React, { useRef, useState } from "react";

export function Inputs_for_shop_update(props) {
  let [inputTextCounter, setInputTextCounter] = useState(0);
  let [inputValue, setInputValue] = useState("");
  function inputChangeHandler(defs) {
    if (props?.inputLimit) {
      defs.preventDefault();
      let inputData = defs.currentTarget.value;
      let inputTextLimit = parseInt(props.inputLimit, 10);
      let inputDataAmount = inputData.split("");
      if (inputDataAmount.length > inputTextLimit) return;
      else {
        setInputTextCounter(inputDataAmount.length);
      }
      setInputValue((prev) => (prev = inputData));
    }
  }
  return (
    <>
      {props?.inputLimit ? (
        <div className={`relative ${props?.inputCoverStyle}`}>
          <props.tag
            value={inputValue}
            type={props.inputType}
            name={props.fieldName}
            className={`${props.className} rounded-br-[0]`}
            onChange={inputChangeHandler}
            placeholder={props.inputPlaceholder}
            required={props.isRequired ? true : false}
          />
          <span className="absolute bg-main_website_color_2 text-top_nav_second_color text-[10px] px-[7px] py-[2px] bottom-0 right-0 translate-y-[100%]">
            {inputTextCounter} / {props.inputLimit}
          </span>
        </div>
      ) : (
        <props.tag
          type={props.inputType}
          className={props.className}
          placeholder={props.inputPlaceholder}
          required={props.isRequired ? true : false}
        />
      )}
    </>
  );
}

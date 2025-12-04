
import { useRef } from "react";

const InputField = ({
  label,
  placeholder,
  name = "name",
  type = "text",
  value,
  onChange,
  error = "",
}) => {
  const inputRef = useRef(null);


  return (
    <div className="flex flex-col gap-2 w-full relative">
      <label className="text-gray-900 text-[15px] font-medium">{label}</label>

      <input
        ref={inputRef}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className="
          w-full bg-white text-gray-700
          border border-gray-300
          rounded-md px-4 py-3
          focus:outline-none focus:border-gray-400
          placeholder:text-gray-400
          shadow-sm
        "
      />


      <p className="text-xs text-red-500 h-4">{error}</p>

    </div>
  );
};

export default InputField;

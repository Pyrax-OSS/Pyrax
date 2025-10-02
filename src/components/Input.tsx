import { FC, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField: FC<InputFieldProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-semibold mb-1">{label}</label>
      <input
        {...props}
        className="border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
      />
    </div>
  );
};

export default InputField;

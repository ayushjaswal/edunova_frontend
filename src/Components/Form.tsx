import { parameterInterface } from "@/types";
import { useState, useEffect } from "react";

interface FormProps {
  parameters: parameterInterface[];
  handleFormSubmit: (values: { [key: string]: string }) => void;
}

const Form = ({ parameters, handleFormSubmit }: FormProps) => {
  const [values, setValues] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const initialValues: { [key: string]: string } = {};
    parameters.forEach((param) => {
      initialValues[param.name] = "";
    });
    setValues(initialValues);
  }, [parameters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFormSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}  className="flex flex-col gap-2 mt-10">
      {parameters.map((parameter) => (
        <div key={parameter.name} className="">
          {parameter.element === "input" && (
            <input
              className="w-full bg-gray-100 py-1 px-2 rounded-md outline-none focus-within:ring ring-blue-300"
              type={parameter.type}
              name={parameter.name}
              placeholder={parameter.name}
              onChange={handleChange}
              value={values[parameter.name] || ""}
            />
          )}
        </div>
      ))}
      <button
        className="btn"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;

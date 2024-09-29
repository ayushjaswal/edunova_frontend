import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Form from "./Form";
import { APIInterface } from "@/types";
import axios from "axios";
import { path } from "@/path";
import JSONPretty from "react-json-pretty";

const User = () => {
  const [result, setResult] = useState("");
  const [api, setApi] = useState<APIInterface>();
  const handleAPI = async (values: APIInterface) => {
    setApi({
      name: values.name,
      path: values.path,
      parameters: values.parameters,
      method: values.method,
      query: values.query,
      params: values.params,
    });
  };

  const handleFormSubmit = async (values: { [key: string]: string }) => {
    try {
      let result;
      if (api?.method === "GET") {
        result = await axios.get(`${path}/user${api!.path}`);
      } else {
        result = await axios({
          method: api?.method,
          url: `${path}/user${api!.path}`,
          data: values,
        });
      }
      setResult(JSON.stringify(result.data));
    } catch (error) {
      console.error("Error submitting API:", error);
      setResult("Error submitting API");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex w-full h-[100vh]">
        <div className="w-full border-r">
          <h1 className="title">APIs</h1>
          <div
            onClick={() => {
              setResult("");
              handleAPI({
                name: "getAllUsers",
                path: "/",
                method: "GET",
                query: false,
                params: false,
              });
            }}
            className="route"
          >
            / (getAllUsers)
          </div>
          <div
            onClick={() => {
              handleAPI({
                name: "addUser",
                path: "/add-user",
                method: "POST",
                parameters: [
                  { name: "name", element: "input", type: "text" },
                  { name: "email", element: "input", type: "text" },
                ],
                params: false,
                query: false,
              });
              setResult("");
            }}
            className="route"
          >
            /add-user (addUser)
          </div>
        </div>
        <div className="w-full border-r">
          <h1 className="title">Parameters</h1>
          <div className="px-4">
            {api?.parameters ? (
              <Form
                // initialValues={initialValuesAddUser}
                handleFormSubmit={handleFormSubmit}
                parameters={api.parameters}
              />
            ) : (
              <div>
                No Parameters Required
                <div onClick={() => handleFormSubmit({})} className="btn">
                  {" "}
                  Run API
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full px-2 break-words h-[100vh] overflow-y-scroll">
          <h1 className="title">Result</h1>
          <JSONPretty id="json-pretty" data={result}></JSONPretty>
        </div>
      </div>
    </div>
  );
};

export default User;

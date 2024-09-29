import Navbar from "./Navbar/Navbar";
import { APIInterface } from "@/types";
import axios from "axios";
import { path } from "@/path";
import JSONPretty from "react-json-pretty";
import { useState } from "react";
import Form from "./Form";

const Books = () => {
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
        if (api.params) {
          console.log(
            `${path}/book${api!.path}/${values[api.parameters![0].name]}`
          );
          result = await axios.get(
            `${path}/book${api!.path}/${values[api.parameters![0].name]}`
          );
        } else if (api.query) {
          let query = "";
          api.parameters!.map((params) => {
            query += params.name + "=" + values[params.name];
            query += '&'
          });
          query = query.slice(0, -1);
          console.log(`${path}/book${api.path}?${query}`);
          result = await axios.get(`${path}/book${api.path}?${query}`);
        } else {
          result = await axios.get(`${path}/book${api!.path}`);
        }
      } else {
        result = await axios({
          method: api?.method,
          url: `${path}/book${api!.path}`,
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
                name: "getAllBooks",
                path: "/",
                method: "GET",
                params: false,
                query: false,
              });
            }}
            className="route"
          >
            / (getAllBooks)
          </div>
          <div
            onClick={() => {
              handleAPI({
                name: "addBook",
                path: "/add-book",
                method: "POST",
                parameters: [
                  { name: "bookName", element: "input", type: "text" },
                  { name: "category", element: "input", type: "text" },
                  { name: "author", element: "input", type: "text" },
                  { name: "rent", element: "input", type: "number" },
                ],
                params: false,
                query: false,
              });
              setResult("");
            }}
            className="route"
          >
            /add-book (addBook)
          </div>
          <div
            onClick={() => {
              handleAPI({
                name: "findBooksWithRent",
                path: "/find-books",
                params: false,
                query: true,
                method: "GET",
                parameters: [
                  { name: "minimumRent", element: "input", type: "number" },
                  { name: "maximumRent", element: "input", type: "number" },
                ],
              });
              setResult("");
            }}
            className="route"
          >
            /find-books (findBooksWithRent)
          </div>
          <div
            onClick={() => {
              handleAPI({
                name: "findBooksWithKeyword",
                path: "/find-books",
                params: true,
                query: false,
                method: "GET",
                parameters: [
                  { name: "bookName", element: "input", type: "text" },
                ],
              });
              setResult("");
            }}
            className="route"
          >
            /find-books/:query (findBooksWithKeyword)
          </div>
          <div
            onClick={() => {
              handleAPI({
                name: "findBooksWithValues",
                path: "/search",
                params: false,
                query: true,
                method: "GET",
                parameters: [
                  { name: "minimumRent", element: "input", type: "number" },
                  { name: "maximumRent", element: "input", type: "number" },
                  { name: "category", element: "input", type: "text" },
                  { name: "keyword", element: "input", type: "text" },
                ],
              });
              setResult("");
            }}
            className="route"
          >
            /search/:query (findBooksWithValues)
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

export default Books;

import Navbar from "./Navbar/Navbar";
import { APIInterface } from "@/types";
import axios from "axios";
import { path } from "@/path";
import JSONPretty from "react-json-pretty";
import { useState } from "react";
import Form from "./Form";

const Transactions = () => {
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
            `${path}/transaction${api!.path}/${values[api.parameters![0].name]}`
          );
          result = await axios.get(
            `${path}/transaction${api!.path}/${values[api.parameters![0].name]}`
          );
        } else if (api.query) {
          let query = "";
          api.parameters!.map((params) => {
            query += params.name + "=" + values[params.name];
            query += "&";
          });
          query = query.slice(0, -1);
          console.log(`${path}/transaction${api.path}?${query}`);
          result = await axios.get(`${path}/transaction${api.path}?${query}`);
        } else {
          result = await axios.get(`${path}/transaction${api!.path}`);
        }
      } else {
        result = await axios({
          method: api?.method,
          url: `${path}/transaction${api!.path}`,
          data: values,
        });
      }
      setResult(JSON.stringify(result.data));
    } catch (error) {
      console.error("Error submitting API:", error);
      setResult(JSON.stringify(error!.response.data));
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
                name: "getAllTransactions",
                path: "/",
                method: "GET",
                query: false,
                params: false,
              });
            }}
            className="route"
          >
            / (getAllTransactions)
          </div>
          <div
            onClick={() => {
              handleAPI({
                name: "createTransaction",
                path: "/create-transaction",
                method: "POST",
                parameters: [
                  { name: "issuer", element: "input", type: "text" },
                  { name: "bookName", element: "input", type: "text" },
                  { name: "issueDate", element: "input", type: "Date" },
                ],
                params: false,
                query: false,
              });
              setResult("");
            }}
            className="route"
          >
            /create-transaction (createTransaction)
          </div>
          <div
            onClick={() => {
              handleAPI({
                name: "closeTransaction",
                path: "/close-transaction",
                method: "POST",
                parameters: [
                  { name: "issuer", element: "input", type: "text" },
                  { name: "bookName", element: "input", type: "text" },
                  { name: "returnDate", element: "input", type: "Date" },
                ],
                params: false,
                query: false,
              });
              setResult("");
            }}
            className="route"
          >
            /close-transaction (closeTransaction)
          </div>
          <div
            onClick={() => {
              handleAPI({
                name: "getBookByDateRange",
                path: "/get-book-by-date-range",
                method: "GET",
                parameters: [
                  { name: "minDate", element: "input", type: "date" },
                  { name: "maxDate", element: "input", type: "date" },
                ],
                params: false,
                query: true,
              });
              setResult("");
            }}
            className="route"
          >
            /get-book-by-date-range (getBookByDateRange)
          </div>
          <div
            onClick={() => {
              handleAPI({
                name: "getBookInfo",
                path: "/",
                method: "GET",
                parameters: [
                  { name: "bookName", element: "input", type: "text" },
                ],
                params: true,
                query: false,
              });
              setResult("");
            }}
            className="route"
          >
            /:bookName (getBookInfo)
          </div>
          <div
            onClick={() => {
              handleAPI({
                name: "getBookInfo",
                path: "/get-revenue",
                method: "GET",
                parameters: [
                  { name: "bookName", element: "input", type: "text" },
                ],
                params: true,
                query: false,
              });
              setResult("");
            }}
            className="route"
          >
            /get-revenue/:bookName (getBookTotalRevenue)
          </div>
          <div
            onClick={() => {
              handleAPI({
                name: "getUserBook",
                path: "/get-user-book",
                method: "GET",
                parameters: [{ name: "name", element: "input", type: "text" }],
                params: true,
                query: false,
              });
              setResult("");
            }}
            className="route"
          >
            /get-user-book/:name (getUserBook)
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

export default Transactions;

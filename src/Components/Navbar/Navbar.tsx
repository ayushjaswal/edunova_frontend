import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("");
  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname.includes("user")) {
      setActive("user");
    } else if (location.pathname.includes("transactions")) {
      setActive("transactions");
    } else if (location.pathname.includes("books")) {
      setActive("books");
    }
  }, [location]);
  return (
    <div className=" flex justify-between py-1 mx-4 my-1 px-4 gap-2 bg-gray-200 rounded-md">
      <div
        onClick={() => navigate("/user")}
        className={`w-full text-center border px-2 py-1 rounded-md cursor-pointer ${
          active === "user" ? "bg-white shadow-sm" : ""
        }`}
      >
        User
      </div>

      <div
        onClick={() => navigate("/books")}
        className={`w-full text-center border px-2 py-1 rounded-md cursor-pointer ${
          active === "books" ? "bg-white shadow-sm" : ""
        }`}
      >
        {" "}
        Books{" "}
      </div>
      <div
        onClick={() => navigate("/transactions")}
        className={`w-full text-center border px-2 py-1 rounded-md cursor-pointer ${
          active === "transactions" ? "bg-white shadow-sm" : ""
        }`}
      >
        {" "}
        Transactions{" "}
      </div>
    </div>
  );
};

export default Navbar;

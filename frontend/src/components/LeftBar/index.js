import "./style.css";
import React from "react";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="Links-Admin">
      <span className="name">
      <Link to={"/admin/users"}>All Users</Link>
      </span>
    </div>
  );
};

export default LeftSideBar;

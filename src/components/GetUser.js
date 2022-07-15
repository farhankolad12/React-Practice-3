import React from "react";

const GetUser = ({ onClick, output }) => {
  return (
    <>
      <form onSubmit={onClick}>
        <input type={"text"} placeholder="Enter a id" />
        <input type={"submit"} placeholder="Get Details" />
      </form>
      <div className="table">{output}</div>
    </>
  );
};

export default GetUser;

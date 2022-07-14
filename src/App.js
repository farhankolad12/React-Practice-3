import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import GetUser from "./components/GetUser";
import { getUser } from "./helpers/helper";
import { addUser } from "./helpers/helper";
import Parser from "html-react-parser";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const id = "#" + Math.floor(Math.random() * 500).toString();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const state = e.target[2].value;
    const city = e.target[3].value;
    const pin = e.target[4].value;

    if (
      firstName === "" ||
      lastName === "" ||
      city === "" ||
      state === "" ||
      pin === ""
    ) {
      setOutput("<p>Fill Out the details</p>");
    } else {
      addUser(firstName, lastName, state, city, pin, id);
      setOutput(`<p>Your ID ${id}</p>`);
      e.target.reset();
    }
  };

  const getUserFromFirebase = (e) => {
    setOutput("");
    e.preventDefault();
    setLoading(true);

    {
      e.target[0].value === ""
        ? setLoading(false)
        : getUser(e.target[0].value).then((res) => {
            !res
              ? setOutput("<p>No Data Found</p>")
              : setOutput(`
        <h2>Showing for id: ${e.target[0].value}</h2>
        <table>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>State</th>
            <th>City</th>
            <th>Pincode</th>
          </tr>
          <tr>
            <td>${res.firstName}</td>
            <td>${res.lastName}</td>
            <td>${res.userState}</td>
            <td>${res.userCity}</td>
            <td>${res.userPin}</td>
          </tr>
        </table>
      `);
            setLoading(false);
          });
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form submit={submit} />} />
        <Route
          path="/check-status"
          element={<GetUser onClick={getUserFromFirebase} />}
        />
      </Routes>
      <p>{loading ? "Loading..." : ""}</p>
      <div className="output">{Parser(output)}</div>
    </>
  );
}

export default App;

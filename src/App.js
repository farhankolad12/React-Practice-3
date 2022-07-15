import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import GetUser from "./components/GetUser";
import { getUser } from "./helpers/helper";
import { addUser } from "./helpers/helper";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);
  const [outputID, setOutputID] = useState("");
  const [outputTable, setOutputTable] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");

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
      setOutputID("Fill Out the details");
    } else {
      addUser(firstName, lastName, state, city, pin, id);
      setOutputID(`Your ID ${id}`);
      e.target.reset();
    }
  };

  const getUserFromFirebase = (e) => {
    setOutputTable("");
    e.preventDefault();
    setLoading(true);
    {
      e.target[0].value === ""
        ? setLoading(false)
        : getUser(e.target[0].value).then((res) => {
            if (!res) {
              setOutputTable("No Data Found");
            } else {
              setFirstname(res.firstName);
              setLastname(res.lastName);
              setState(res.userState);
              setCity(res.userCity);
              setPin(res.userPin);
              setOutputTable("Data Found");
            }
            setLoading(false);
          });
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form output={outputID} submit={submit} />} />
        <Route
          path="/check-status"
          element={
            <GetUser
              output={
                outputTable === "Data Found" ? (
                  <table>
                    <tr>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>State</th>
                      <th>City</th>
                      <th>Pincode</th>
                    </tr>
                    <tr>
                      <td>{firstName}</td>
                      <td>{lastName}</td>
                      <td>{state}</td>
                      <td>{city}</td>
                      <td>{pin}</td>
                    </tr>
                  </table>
                ) : (
                  outputTable
                )
              }
              onClick={getUserFromFirebase}
            />
          }
        />
      </Routes>
      <p>{loading ? "Loading..." : ""}</p>
    </>
  );
}

export default App;

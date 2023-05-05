import { TextInput } from "../components/widgets";
import axios from "axios";
import { useState } from "react";

const update = (setResult) => {
  alert("hello");
  let data = {};
  data.firstname = document.loginform.firstname.value;
  data.lastname = document.loginform.lastname.value;
  data.emailId = document.loginform.email.value;
  data.phoneNumber = document.loginform.phone.value;
  data.address = document.loginform.address.value;
  axios
    .post("/employee/addEmployee", data, {
      headers: { Authorization: localStorage.getItem("JWT") },
    })
    .then((_res) => {
      setResult("success");
      console.log("data added!");
    })
    .catch((error) => {
      setResult("error");
      console.error(error);
    });
};

export default function AddEmployee() {
  let [result, setResult] = useState(null);
  return (
    <div className="login-card">
      <form
        action="/api/login"
        method="POST"
        name="loginform"
        className="login-form"
      >
        <h1 className="formheader">Add Employee</h1>
        <div className="horizontal-input-row">
          <TextInput
            inputType="text"
            name="firstname"
            label="firstname"
            placeholder="Enter firstname"
          ></TextInput>
          <TextInput
            inputType="text"
            name="lastname"
            label="lastname"
            placeholder="Enter lastname"
          ></TextInput>
        </div>
        <TextInput
          inputType="email"
          name="email"
          label="email"
          placeholder="Email"
        ></TextInput>
        <TextInput
          inputType="text"
          name="address"
          label="address"
          placeholder="Enter address"
        ></TextInput>
        <TextInput
          inputType="phone"
          name="phone"
          label="phone"
          placeholder="Enter phone number"
        ></TextInput>
        <button
          type="button"
          className="button stretched-button"
          onClick={() => {
            update(setResult);
          }}
        >
          Add user
        </button>
      </form>
    </div>
  );
}

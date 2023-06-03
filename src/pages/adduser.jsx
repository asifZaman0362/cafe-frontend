import { TextInput } from "../components/widgets";
import axios from "axios";
const update = () => {
  let data = {};
  data.username = document.loginform.username.value;
  data.password = document.loginform.password.value;
  data.email = document.loginform.email.value;
  data.phone = document.loginform.phone.value;
  data.accessLevel = "Cashier";
  axios
    .post("/access/addUser", data, {
      headers: { Authorization: localStorage.getItem("JWT") },
    })
    .then((_res) => {
      <Modal
        title="Success"
        text="User added successfully"
        linkPositive="../"
      />;
      console.log("data added!");
    })
    .catch((error) => {
      <Modal title="Failure" text="Failed to add user" linkPositive="." />;
      console.error(error);
    });
};

export default function AddUser() {
  return (
    <div className="login-card">
      <form method="POST" name="loginform" className="login-form">
        <h1 className="formheader">Add Login</h1>
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
          inputType="text"
          name="username"
          label="username"
          placeholder="Enter username"
        ></TextInput>
        <TextInput
          inputType="password"
          name="password"
          label="password"
          placeholder="Enter password"
        ></TextInput>
        <TextInput
          inputType="email"
          name="email"
          label="email"
          placeholder="Enter email"
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
          onClick={update}
        >
          Add user
        </button>
      </form>
    </div>
  );
}

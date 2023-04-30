import { TextInput, Spinner } from "../components/widgets";
import axios, { HttpStatusCode } from "axios";

async function handleRegistration(updateToken) {
  let username = document.loginform.username.value;
  let password = document.loginform.password.value;
  let email = document.loginform.email.value;
  if (!document.loginform.checkValidity()) {
    document.loginform.reportValidity();
  }
  // login using API
  console.log(username, password, email);
  let result = await axios.post("/auth/register", {
    username: username,
    password: password,
    email: email,
  });
  if (result.status == HttpStatusCode.Ok) {
    updateToken(result.data.token);
    localStorage.setItem("JWT", result.data.token);
    alert("Registered!");
  } else {
    alert("User exists!");
  }
}

export default function RegisterBox(props) {
  return (
    <div className="login-card">
      <form
        action="/api/auth/register"
        method="POST"
        name="loginform"
        className="login-form"
      >
        <h1 className="formheader">Register</h1>
        <TextInput
          inputType="text"
          name="username"
          label="username"
          required={true}
          placeholder="Enter username"
        ></TextInput>
        <TextInput
          inputType="text"
          name="email"
          label="email"
          required={true}
          placeholder="Enter email"
        ></TextInput>
        <TextInput
          inputType="password"
          name="password"
          label="password"
          required={true}
          placeholder="Enter password"
        ></TextInput>
        <button
          type="button"
          className="button stretched-button"
          onClick={() => handleRegistration(props.setToken)}
        >
          Login
        </button>
      </form>
    </div>
  );
}

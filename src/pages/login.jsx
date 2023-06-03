import { TextInput, DropDown } from "../components/widgets";
import axios, { HttpStatusCode } from "axios";

async function handleLogin(updateToken) {
  let username = document.loginform.username.value;
  let password = document.loginform.password.value;
  let accessLevel = document.loginform.access.value;
  if (!document.loginform.checkValidity()) {
    document.loginform.reportValidity();
  }
  // login using API
  axios
    .post("/auth/login", {
      username: username,
      password: password,
      accessLevel: accessLevel,
    })
    .then((_res) => {
      updateToken();
      localStorage.setItem("JWT", _res.data.token);
    })
    .catch((_err) => {
      alert("invalid credentials!");
      document.loginform.username.setCustomValidity("Invalid credentials");
      document.loginform.password.setCustomValidity("Invalid credentials");
      document.loginform.password.addEventListener("input", (_e) =>
        document.loginform.password.setCustomValidity("")
      );
      document.loginform.username.addEventListener("input", (_e) =>
        document.loginform.username.setCustomValidity("")
      );
    });
}

export default function LoginBox(props) {
  return (
    <div className="login-card">
      <form
        action="/api/auth/login"
        method="POST"
        name="loginform"
        className="login-form"
      >
        <h1 className="formheader">Sign In</h1>
        <DropDown
          id="loginselector"
          name="access"
          label="Login as"
          options={["Manager", "Cashier"]}
        />
        <TextInput
          inputType="text"
          name="username"
          label="username"
          required={true}
          placeholder="Enter username"
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
          onClick={() => handleLogin(props.setToken)}
        >
          Login
        </button>
      </form>
    </div>
  );
}

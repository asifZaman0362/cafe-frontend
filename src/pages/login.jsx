import { TextInput, Spinner } from "../components/widgets";

function handleLogin(updateToken) {
  let username = document.loginform.username.value;
  updateToken({
    user: username,
  });
}

export default function LoginBox(props) {
  return (
    <div className="login-card">
      <form
        action="/api/login"
        method="POST"
        name="loginform"
        className="login-form"
      >
        <h1 className="formheader">Sign In</h1>
        <Spinner
          id="loginselector"
          name="access"
          label="Login as"
          options={["Manager", "Cashier"]}
        />
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

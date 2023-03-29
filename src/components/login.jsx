import { TextInput, Spinner } from "./widgets";
function LoginBox(_props) {
  return (
    <div className="logincard">
      <form action="/api/login" method="POST" name="loginform" className="login-form">
        <h1 className="formheader">Sign In</h1>
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
        <button type="button" className="form-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default function LoginPage(_props) {
  return (
    <div className="loginpage full">
      <header>
        <div className="title">Cafeteria Management App</div>
      </header>
      <LoginBox></LoginBox>
    </div>
  );
}
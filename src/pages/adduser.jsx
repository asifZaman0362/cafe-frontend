import { TextInput, Spinner } from "../components/widgets";

function AddUser(_props) {
  return (
    <div className="login-card">
      <form
        action="/api/login"
        method="POST"
        name="loginform"
        className="login-form"
      >
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
        <button type="button" className="button stretched-button">
          Add user
        </button>
      </form>
    </div>
  );
}

export default function AddUserPage(_props) {
  return (
    <div className="loginpage full">
      <header>
        <div className="title">Cafeteria Management App</div>
      </header>
      <AddUser />
    </div>
  );
}

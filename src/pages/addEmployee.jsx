import { TextInput } from "../components/widgets";

export default function AddEmployee() {
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
          inputType="email"
          name="email"
          label="email"
          placeholder="Email"
        ></TextInput>
        <TextInput
          inputType="text"
          name="text"
          label="address"
          placeholder="Enter address"
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

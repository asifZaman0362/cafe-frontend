export function TextInput(props) {
  return (
    <div className="input-field" id={props.id}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.inputType}
        name={props.name}
        placeholder={props.placeholder ? props.placeholder : "Enter text"}
        required={props.required}
        id={props.name}
      />
    </div>
  );
}

export function DropDown(props) {
  return (
    <div className="select-container" id={props.id}>
      <label htmlFor={props.name}>{props.label}</label>
      <select name={props.name}>
        {props.options.map((option) => {
          return <option>{option}</option>;
        })}
      </select>
    </div>
  );
}

import { TextInput } from "../components/widgets";

async function handleOrderCreation(token) {
  let name = document.loginform.customer.value;
  let phone = document.loginform.phone.value;
  if (!document.loginform.checkValidity()) {
    document.loginform.reportValidity();
  }
}

export function CreateOrder(props) {
  return (
    <div className="order-form">
      <form name="orderForm">
        <h1 className="formheader">Order Details</h1>
        <TextInput
          inputType="text"
          name="customer"
          required={true}
          label="Customer name"
          placeholder="Customer Name"
        />
        <TextInput
          inputType="phone"
          name="phone"
          required={true}
          placeholder="Phone number"
          label="Phone number"
        />
        <button
          type="button"
          className="button stretched-button"
          onClick={() => handleOrderCreation(props.token)}
        >
          Proceed
        </button>
      </form>
    </div>
  );
}

import { TextInput } from "../components/widgets";
import { get, post } from "../request";

async function handleOrderCreation() {
  let name = document.orderForm.customer.value;
  let phone = document.orderForm.phone.value;
  let date = new Date();
  let items = [];
  if (!document.orderForm.checkValidity()) {
    document.orderForm.reportValidity();
  } else {
    post("/billing/addOrder", {
      date: date,
      customer_name: name,
      phone: phone,
      items: items,
    })
      .then((res) => {
        if (res.status == 200) {
          const id = res.data.id;
          window.location.replace(`../order/${id}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
          onClick={() => handleOrderCreation()}
        >
          Proceed
        </button>
      </form>
    </div>
  );
}

type CustomerFormProps = {
  name: string;
  phone: string;
  email: string;
  isEditing: boolean;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
};

export default function CustomerForm({
  name,
  phone,
  email,
  isEditing,
  onNameChange,
  onPhoneChange,
  onEmailChange,
  onSubmit,
}: CustomerFormProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <h3>{isEditing ? "Edit Customer" : "Add Customer"}</h3>

      <div>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>

      <div>
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
        />
      </div>

      <div>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={!name || !phone} //the Add customer button is disabled when either Name or Phone fields are empty
        >
        {isEditing ? "Update Customer" : "Add Customer"}
       </button>

    </div>
  );
}

/*What this component does (plain explanation)

It does not store state
It does not know about customers

It only:
Displays input fields
Calls functions passed to it

This is called a presentational component.
That is good design. 
*/
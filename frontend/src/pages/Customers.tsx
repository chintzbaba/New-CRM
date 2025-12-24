// Backend now created and using async for data management - No Database connectivity yet


import { useEffect, useState } from "react";
import CustomerForm from "../components/CustomerForm";
import { getCustomers, addCustomer, deleteCustomer, updateCustomer, } from "../services/customerService";
import type { Customer } from "../services/customerService";


//Defines content of customers page
export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [editingCustomerId, setEditingCustomerId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Load customers from backend
  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
      setLoading(false);
    });
  }, []);

  // Persist locally for now (temporary hybrid step)
  //useEffect(() => {
    //if (!loading) {
      //saveCustomers(customers);
    //}
 // }, [customers, loading]);

  const handleAddCustomer = async () => {

    if (!name || !phone) return;

    if (editingCustomerId === null) {
      addCustomer({ name, phone, email }).then((createdCustomer) => {
        setCustomers((prev) => [...prev, createdCustomer]);
      });
    } 
    
    else {
        try {
          const updated = await updateCustomer(editingCustomerId, {
            name,
            phone,
            email,
          });

          setCustomers((prev) =>
            prev.map((c) => (c.id === updated.id ? updated : c))
          );

          setEditingCustomerId(null);
        } catch (error) {
          console.error("Update failed", error);
        }
      }

    setName("");
    setPhone("");
    setEmail("");
  };

  const handleDeleteCustomer = async (id: number) => {
  try {
    await deleteCustomer(id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  } catch (error) {
    console.error("Delete failed", error);
  }
};


  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading customers...</p>;
  }

  return (
    <div>
      <h2>Customers</h2>

      <CustomerForm
        name={name}
        phone={phone}
        email={email}
        isEditing={editingCustomerId !== null}
        onNameChange={setName}
        onPhoneChange={setPhone}
        onEmailChange={setEmail}
        onSubmit={handleAddCustomer}
      />

      <div style={{ marginBottom: "12px" }}>
        <input
          placeholder="Search customers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")}>Clear</button>
        )}
      </div>

      {filteredCustomers.length === 0 ? (
        <p>No matching customers found.</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditingCustomerId(c.id);
                      setName(c.name);
                      setPhone(c.phone);
                      setEmail(c.email);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCustomer(c.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}








//Below is the code when the backend was not created and the forntend was using localstorage for managing the data and a basic service customerService.ts

/*import { getCustomers, saveCustomers } from "../services/customerService";
import type { Customer } from "../services/customerService";
import CustomerForm from "../components/CustomerForm";
import { useState, useEffect } from "react"; //defines content of customers page

//Add submit handler
//Customer state declarations 

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
});

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [editingCustomerId, setEditingCustomerId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");


  // ✅ Save customers whenever they change
  useEffect(() => {
  saveCustomers(customers);
}, [customers]);

useEffect(() => {
  getCustomers().then((data) => {
    setCustomers(data);
    setLoading(false);
  });
}, []);




  //Checks that fields are not empty, 
  //Customer Add handler
    const handleAddCustomer = () => {
      if (!name || !phone || !email) return;

      if (editingCustomerId === null) {
        // Add new customer 
        const newCustomer: Customer = {
          id: Date.now(),
          name,
          phone,
          email,
        };

  //Clears the form
  setCustomers((prev) => [...prev, newCustomer]);
    } else { 
        // Edit existing customer
    const updatedCustomers = customers.map((c) =>
      c.id === editingCustomerId
        ? { ...c, name, phone, email }
        : c
    );

    setCustomers(updatedCustomers);
    setEditingCustomerId(null);
  }     
    setName("");
    setPhone("");
    setEmail("");
  };

  //Customer delete handler
  const handleDeleteCustomer = (id: number) => {
  const updatedCustomers = customers.filter((c) => c.id !== id);
  setCustomers(updatedCustomers);
};

//Compute filtered customers
const filteredCustomers = customers.filter((customer) =>
  customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  customer.phone.includes(searchTerm) ||
  customer.email.toLowerCase().includes(searchTerm.toLowerCase())
);


  return ( //Add the form UI in divs 
  <div> 
    <h2>Customers</h2> 
       
   
          <CustomerForm
            name={name}
            phone={phone}
            email={email}
            isEditing={editingCustomerId !== null}
            onNameChange={setName}
            onPhoneChange={setPhone}
            onEmailChange={setEmail}
            onSubmit={handleAddCustomer}
          />
      
    
    <div style={{ marginBottom: "12px" }}>
      <input
        type="text"
        placeholder="Search customers by name, phone, or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "300px", marginRight: "8px" }}
      />

      
      {searchTerm && (                                //Shows Clear button only when search is active 
         <button onClick={() => setSearchTerm("")}>
          Clear
        </button> // Clear the search term field and make the placeholder empty when Clear button is clicked
               )}
    </div>


    {filteredCustomers.length === 0 ? ( //if there are no customers in the list show the following text
      <p>No customers added yet.</p>
    ) : ( 
//table layout and column content defined with delete actions to be performed on the table
     
        <div style={{ marginTop: "16px" }}>        
          <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
              {filteredCustomers.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.email}</td>
                  <td>
                    <button
                      onClick={() => {                //Edit button logic on click calls function setEditingCustomerId()
                        setEditingCustomerId(c.id);
                        setName(c.name);
                        setPhone(c.phone);
                        setEmail(c.email);
                      }}
                    >
                      Edit
                    </button>
                        
                    <button
                      style={{ marginLeft: "8px" }}
                      onClick={() => handleDeleteCustomer(c.id)} // Delete button logic on click calls function handleDeleteCustomer()
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
          </tbody>
      </table>
      </div>
      )}
    </div>
  );
}
*/
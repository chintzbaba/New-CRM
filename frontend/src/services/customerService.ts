export type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

const STORAGE_KEY = "customers";

export async function getCustomers(): Promise<Customer[]> {
  const response = await fetch("http://localhost:5000/customers");
  return response.json();
}


export function saveCustomers(customers: Customer[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

/*What this file does (plain explanation)

Defines what a Customer looks like
Knows where customers are stored
Knows how to read and write them
Nothing else

This file:

Does not know about React
Does not know about UI
Does not know about forms
That separation is intentional and correct*/
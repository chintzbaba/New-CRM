type JobFormField =
  | "customer_id"
  | "job_date"
  | "category"
  | "description"
  | "units"
  | "product_price"
  | "service_price"
  | "product_cost"
  | "service_cost"
  | "remarks"
  | "profit";

type JobFormValue = string | number;

type JobFormProps = {
  customers: { id: number; name: string }[];
  customerId: number | "";
  jobDate: string;
  category: string;
  description: string;
  units: number;
  productPrice: number;
  servicePrice: number;
  productCost: number;
  serviceCost: number;
  remarks: string;
  profit: number;
  onChange: (field: JobFormField, value: JobFormValue) => void;
  onSubmit: () => void;
};




export default function JobForm({
  customers,
  customerId,
  jobDate,
  category,
  description,
  units,
  productPrice,
  servicePrice,
  productCost,
  serviceCost,
  remarks,
  profit,
  onChange,
  onSubmit,
}: JobFormProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <h3>Add Job</h3>

      <select
        value={customerId}
        onChange={(e) =>
                onChange(
                    "customer_id",
                    e.target.value === "" ? "" : Number(e.target.value)
                )
                }

      >
        <option value="">Select Customer</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={jobDate}
        onChange={(e) => onChange("job_date", e.target.value)}
      />

      <input
        placeholder="Category (Sale / Rental / Service)"
        value={category}
        onChange={(e) => onChange("category", e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => onChange("description", e.target.value)}
      />

      <input
        type="number"
        placeholder="Units"
        value={units}
        onChange={(e) => onChange("units", Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Product Price"
        value={productPrice}
        onChange={(e) => onChange("product_price", Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Service Price"
        value={servicePrice}
        onChange={(e) => onChange("service_price", Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Product Cost"
        value={productCost}
        onChange={(e) => onChange("product_cost", Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="Service Cost"
        value={serviceCost}
        onChange={(e) => onChange("service_cost", Number(e.target.value))}
      />

      <input
        placeholder="Remarks"
        value={remarks}
        onChange={(e) => onChange("remarks", e.target.value)}
      />

      <input
        type="number"
        placeholder="Profit"
        value={profit}
        onChange={(e) => onChange("profit", Number(e.target.value))}
      />

      <button
        onClick={onSubmit}
        disabled={!customerId || !jobDate || !category || !description}
      >
        Add Job
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import type { Job } from "../services/jobService";

import JobForm from "../components/JobForm";
import { addJob } from "../services/jobService";
import { getCustomers } from "../services/customerService";

function calculateProfit(form: JobFormState): number {
  return (
    (form.product_price + form.service_price) -
    (form.product_cost + form.service_cost)
  );
}

//
type JobFormState = {
  customer_id: number | "";
  job_date: string;
  category: string;
  description: string;
  units: number;
  product_price: number;
  service_price: number;
  product_cost: number;
  service_cost: number;
  remarks: string;
// profit: number; - removing profit field from jobForm so it can be calculated on backend automatically without relying on frontend input from user
};


export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<{ id: number; name: string }[]>([]);
  const [jobForm, setJobForm] = useState<JobFormState>({

    customer_id: "",
    job_date: "",
    category: "",
    description: "",
    units: 1,
    product_price: 0,
    service_price: 0,
    product_cost: 0,
    service_cost: 0,
    remarks: "",
    //profit: 0,
    });

  useEffect(() => {
    getJobs()
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
  getCustomers().then(setCustomers);
}, []);

const handleJobChange = (
  field: string,
  value: string | number
) => {
  if (!(field in jobForm)) return;

  setJobForm((prev) => ({
    ...prev,
    [field]: value,
  }));
};

const handleAddJob = async () => {
  const profit = calculateProfit(jobForm);

const newJob = await addJob({
  customer_id: jobForm.customer_id as number,
  job_date: jobForm.job_date,
  category: jobForm.category,
  description: jobForm.description,
  units: jobForm.units,
  product_price: jobForm.product_price,
  service_price: jobForm.service_price,
  product_cost: jobForm.product_cost,
  service_cost: jobForm.service_cost,
  remarks: jobForm.remarks,
  profit,
  //profit: jobForm.profit, removing profit field from jobForm so it can be calculated on backend automatically without relying on frontend input from user
});

  setJobs((prev) => [newJob, ...prev]);

  setJobForm({
    customer_id: "",
    job_date: "",
    category: "",
    description: "",
    units: 1,
    product_price: 0,
    service_price: 0,
    product_cost: 0,
    service_cost: 0,
    remarks: "",
    //profit: 0, - removing profit field from jobForm so it can be calculated on backend automatically without relying on frontend input from user
  });
};



  if (loading) {
    return <p>Loading jobs...</p>;
  }

  return (
    <div>
      <h2>Jobs</h2>
        <JobForm
            customers={customers}
            customerId={jobForm.customer_id}
            jobDate={jobForm.job_date}
            category={jobForm.category}
            description={jobForm.description}
            units={jobForm.units}
            productPrice={jobForm.product_price}
            servicePrice={jobForm.service_price}
            productCost={jobForm.product_cost}
            serviceCost={jobForm.service_cost}
            remarks={jobForm.remarks}
            //profit={jobForm.profit} - removing profit field from jobForm so it can be calculated on backend automatically without relying on frontend input from user
            onChange={handleJobChange}
            onSubmit={handleAddJob}
        />

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Category</th>
              <th>Description</th>
              <th>Units</th>
              <th>Product Price</th>
              <th>Service Price</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.job_date}</td>
                <td>{job.customer_name || job.customer_id}</td>
                <td>{job.category}</td>
                <td>{job.description}</td>
                <td>{job.units}</td>
                <td>{job.product_price}</td>
                <td>{job.service_price}</td>
                <td>{job.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

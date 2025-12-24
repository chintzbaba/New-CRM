export type Job = {
  id: number;
  customer_id: number;
  customer_name?: string;
  job_date: string;
  category: string;
  description: string;
  units: number;
  service_price: number;
  product_price: number;
  service_cost: number;
  product_cost: number;
  remarks: string;
  profit: number;
};

export async function getJobs(): Promise<Job[]> {
  const response = await fetch("http://localhost:5000/jobs");
  if (!response.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return response.json();
}

export async function addJob(job: Omit<Job, "id" | "customer_name">): Promise<Job> {
  const response = await fetch("http://localhost:5000/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    throw new Error("Failed to add job");
  }

  return response.json();
}

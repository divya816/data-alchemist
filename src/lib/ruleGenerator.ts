export type Rule = {
  taskId: number;
  clientId: number;
  workerId: number;
  priority: number;
};

export function generateRules(tasks: any[], clients: any[], workers: any[]): Rule[] {
  const rules: Rule[] = [];

  const secretKey = process.env.SECRET_KEY; // ✅ safe to use in backend
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL; // ✅ also usable in backend

  console.log("🔐 Backend Secret Key:", secretKey);
  console.log("🌐 Backend API URL:", apiBaseUrl);

  tasks.forEach((task: any) => {
    const client = clients.find((c) => c.id === task.client_id);
    const worker = workers.find((w) => w.id === task.assigned_worker_id);

    if (client && worker) {
      rules.push({
        taskId: task.id,
        clientId: client.id,
        workerId: worker.id,
        priority: Math.floor(Math.random() * 10) + 1,
      });
    }
  });

  return rules;
}
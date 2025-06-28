export function validateClients(
  clients: any[],
  validTaskIDs: Set<string>
) {
  const errors: { row: number; messages: string[] }[] = [];

  clients.forEach((client, index) => {
    const rowErrors: string[] = [];

    if (!client.ClientID || client.ClientID.trim() === '') {
      rowErrors.push("Missing ClientID");
    }

    if (!client.RequestedTaskIDs || client.RequestedTaskIDs.trim() === '') {
      rowErrors.push("Missing RequestedTaskIDs");
    } else {
      const taskIds = client.RequestedTaskIDs.split(',').map((t: string) => t.trim());

      taskIds.forEach((id) => {
        if (!validTaskIDs.has(id)) {
          rowErrors.push(Invalid TaskID: ${id});
        }
      });
    }

    if (rowErrors.length > 0) {
      errors.push({ row: index, messages: rowErrors });
    }
  });

  return errors;
}
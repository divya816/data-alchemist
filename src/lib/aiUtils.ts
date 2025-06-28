// lib/aiUtils.ts

/**
 * Sends a natural language prompt to the backend AI API.
 */
export async function askAI(prompt: string): Promise<string> {
  const response = await fetch('/api/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  return data.content || '❌ No AI response received.';
}

/**
 * Suggests data validation fixes based on error messages and a sample of the data.
 *
 * @param errors - An array of string-based validation errors
 * @param data - The CSV data (array of objects)
 */
export async function suggestFixes(errors: string[], data: any[]): Promise<string> {
  const prompt = `You are a data validator AI. Given the following errors:\n\n${errors.join(
    '\n'
  )}\n\nSuggest precise and realistic fixes for this sample data:\n${JSON.stringify(
    data.slice(0, 5),
    null,
    2
  )}`;

  return await askAI(prompt);
}

/**
 * Suggests business rules based on task data (or other logic).
 *
 * @param tasks - Task data array
 */
export async function suggestRules(tasks: any[]): Promise<string> {
  const prompt = `You are an AI that helps generate intelligent business rules for task assignment. Based on the following task data:\n${JSON.stringify(
    tasks.slice(0, 5),
    null,
    2
  )}\n\nSuggest 3-5 optimized rules in plain English.`;

  return await askAI(prompt);
}
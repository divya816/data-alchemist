import { askAI } from './aiUtils';

export async function suggestRules(data: any) {
  const prompt = Based on this data, recommend useful rules:\n${JSON.stringify(data.slice(0, 5))};
  return await askAI(prompt);
}
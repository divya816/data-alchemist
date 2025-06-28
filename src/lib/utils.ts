export function normalizePhases(input: string): number[] {
  if (!input) return [];

  try {
    if (input.trim().startsWith('[')) {
      return JSON.parse(input);
    } else if (input.includes('-')) {
      const [start, end] = input.split('-').map(Number);
      if (isNaN(start) || isNaN(end)) return [];
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    } else {
      const num = Number(input);
      return isNaN(num) ? [] : [num];
    }
  } catch {
    return [];
  }
}
export function generateTableEntries<T>(sampleEntry: T, limit?: number) {
  if (limit === 0) return [];

  const entries: T[] = [];
  for (let i = 0; limit ? i < limit : i < 32; i++) {
    const entry = {
      ...sampleEntry,
      id: i + 1,
    };

    entries.push(entry);
  }

  return entries;
}

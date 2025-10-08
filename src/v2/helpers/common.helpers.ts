export function generateYearsOptions(overlapCount: number = 2) {
  const currentYear = new Date().getFullYear();
  const yearsOptions = [];

  for (let i = -overlapCount; i <= overlapCount; i++) {
    const year = currentYear + i;
    yearsOptions.push({
      value: year,
      label: year.toString(),
      isCurrent: year === currentYear
    });
  }

  return yearsOptions;
}


export function generateRandomColor(seed: string[]): string {
  // Predefined array of vibrant, colorful hex codes
  const colorfulColors = [
    '#FF6B6B', // Coral Red
    '#4ECDC4', // Turquoise
    '#45B7D1', // Sky Blue
    '#96CEB4', // Mint Green
    '#FFEEAD', // Pale Yellow
    '#D4A5A5', // Dusty Rose
    '#9B59B6', // Purple
    '#E74C3C', // Alizarin Red
    '#1ABC9C', // Emerald
    '#F1C40F', // Sunflower Yellow
    '#3498DB', // Blue
    '#E67E22', // Carrot Orange
    '#2ECC71', // Green
    '#F39C12', // Orange
    '#8E44AD', // Wisteria Purple
  ];

  // Combine seed strings into a single hash value
  const hash = seed.reduce((acc, str, index) => {
    const strValue = str.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return acc + strValue * (index + 1);
  }, 0);

  // Use hash to deterministically select an index from the colorfulColors array
  const index = Math.abs(hash) % colorfulColors.length;

  return colorfulColors[index];
}

// Simple hash function for seeding
function hashString(str: string) {
  let hash = 0;
  for (let j = 0; j < str.length; j++) {
    const char = str.charCodeAt(j);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function generateImagePairs(returnImages: string[]) {
  const pairs = [];
  for (let i = 0; i < returnImages.length; i += 2) {
    const pair = [];
    const firstUrl = returnImages[i];
    const secondUrl = returnImages[i + 1] || null; // Handle odd number of images
    // Generate truly random percentage
    const percentage1 = Math.min(70, Math.max(30, Math.floor(Math.random() * 99) + 1)); // Between 1 and 99
    const percentage2 = 100 - percentage1;
    pair.push({ url: firstUrl, percentage: percentage1 });
    if (secondUrl) {
      pair.push({ url: secondUrl, percentage: percentage2 });
    } else {
      // If odd, make single with 100%
      pair[0].percentage = 100;
    }
    pairs.push(pair);
  }
  return pairs;
}
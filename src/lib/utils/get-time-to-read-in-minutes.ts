export function getTimeToReadInMinutes({
  wordCount,
  averageWordsPerMinute = 250,
}: {
  averageWordsPerMinute?: number;
  wordCount: number;
}): number {
  return Math.ceil(wordCount / averageWordsPerMinute);
}

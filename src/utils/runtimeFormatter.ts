export const runtimeFormatter = (minutes: number) => {
  if (minutes < 60) return `${minutes} мин.`;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return mins === 0 ? `${hours} ч.` : `${hours} ч. ${mins} мин.`;
};

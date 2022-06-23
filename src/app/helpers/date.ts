export function getMonthDifference(startDate?: Date, endDate?: Date): number {
  if (startDate === undefined || endDate === undefined) return 0;
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}

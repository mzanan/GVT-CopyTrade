export const setTenPercent = async (balance) => {
  const tenPercent = balance * 0.1;
  const amount = Math.floor(tenPercent * 10000) / 10000; // four decimals

  return amount;
};

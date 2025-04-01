export const sleeper = async (ms: number) => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

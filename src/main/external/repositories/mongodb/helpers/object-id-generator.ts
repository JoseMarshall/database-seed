// eslint-disable-next-line import/prefer-default-export
export const mongoObjectIdGenerator = () => {
  // eslint-disable-next-line no-bitwise
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    // eslint-disable-next-line no-bitwise
    'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16)).toLowerCase()
  );
};

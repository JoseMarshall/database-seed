/**
 * Safely converts a string to an integer.
 * @param s A string to convert into a number.
 * @param radix A value between 2 and 36 that specifies the base of the number in numString.
 * If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
 * All other strings are considered decimal.
 */
export const safeParseInt = (s: string, radix?: number) => {
  const parsedData = parseInt(s, radix);
  return Number.isNaN(parsedData) ? 0 : parsedData;
};

/**
 * Safely converts a string to a floating-point number.
 * @param s
 */
export const safeParseFloat = (s: string) => {
  const parsedData = parseFloat(s);
  return Number.isNaN(parsedData) ? 0 : parsedData;
};

/**
 * Safely converts a string to a Boolean.
 * @return If string does not match 'true' or 'false', it returns false
 * @param s
 */
export const safeParseBoolean = (s: string) => new RegExp(/^true/i).test(s);

/**
 * SafeParseObject converts a string to an object
 * @param s A string to convert into a object
 * @param className The class name to try to convert the string to
 * @returns The object parsed; if an exception occurs, will be returned an empty array []
 * or empty object {} depending on className param
 */
export const safeParseObject = (s: string, className: 'array' | 'object' = 'object') => {
  try {
    return JSON.parse(s);
  } catch (error) {
    return className === 'array' ? [] : {};
  }
};

/**
 * Get a random number between 0 and max, exlcusive
 * @param   max  The upper bound of the random number to return
 * @return       A random integer between 0 and max, exclusive
 */
export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Get a random number between 0 and max, exlcusive
 * @param   max  The upper bound of the random number to return
 * @return       A random integer between 0 and max, exclusive
 */
export const getRandomIntWithNegative = (max: number) => {
  const multiplier = Math.random() >= 0.5 ? 1 : -1;
  return multiplier * Math.floor(Math.random() * Math.floor(max));
}

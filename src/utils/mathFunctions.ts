/**
 * Get a random number between 0 and max, exlcusive
 * @param   max  The upper bound of the random number to return
 * @return       A random integer between 0 and max, exclusive
 */
export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
}

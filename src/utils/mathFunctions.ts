/**
 * Get a random number between 0 and max, exlcusive
 * @param   max  The upper bound of the random number to return
 * @return       A random integer between 0 and max, exclusive
 */
export const getRandomInt = (max: number, negative?: boolean) => {
  const randomInt = Math.floor(Math.random() * Math.floor(max));
  if (negative) {
    const multiplier = Math.random() >= 0.5 ? 1 : -1;
    return multiplier * randomInt;
  } else {
    return randomInt;
  }
}

export function convert(
  digits: number[],
  inputBase: number,
  outputBase: number
): number[] {

  const checkBase = (base: number, errString: string): void => {
    if (base <= 1 || Math.floor(base) !== base) {
      throw( new Error(errString))
    }
  }

  checkBase(inputBase, 'Wrong input base')
  checkBase(outputBase, 'Wrong output base')

  if (digits.length === 0 || (digits.length > 1 && digits[0] === 0)) {
    throw( new Error('Input has wrong format'))
  }
  let val = 0
  let inputMultiplier = 1
  for (let i = digits.length-1; i > -1; i--) {
    if (digits[i] < 0 || digits[i] >= inputBase) {
      throw( new Error('Input has wrong format'))
    }
    val += digits[i] * inputMultiplier
    inputMultiplier = inputBase * inputMultiplier
  }

  if (digits.length === 0 || (val === 0 && digits.length > 1)) {
    throw( new Error('Input has wrong format'))
  }

  if (val === 0) {
    return [0];
  }

  let outputMultiplier = 1
  while (outputMultiplier <= val) { outputMultiplier *= outputBase}
  outputMultiplier /= outputBase
  const outputDigits: number[] = []

  while (val > 0) {
    const currDigit = Math.floor(val / outputMultiplier)
    outputDigits.push(currDigit)
    val -= currDigit * outputMultiplier
    outputMultiplier /= outputBase

    // This is cursed, how do I best handle a trailing 0 when val is 0 and we're at the end 
    if (val === 0 && outputMultiplier === 1) {
      outputDigits.push(0)
    }
  }
  return outputDigits
}

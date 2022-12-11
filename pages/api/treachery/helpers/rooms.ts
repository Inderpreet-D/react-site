export const generateUniqueCode = (codeSet: string[]): string => {
  // Create code
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += String.fromCharCode(65 + Math.floor(Math.random() * 26))
  }

  // Return unique code
  if (!codeSet.includes(code)) {
    return code
  }

  // Try again
  return generateUniqueCode(codeSet)
}

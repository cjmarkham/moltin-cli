/**
 * Plucks only requested fields from a response
 * @param data
 * @param only
 */
const parseOutput = (data: any, only?: string): any => {
  let output: any = {}

  // Gets the fields from the data that the user requested
  if (only) {
    const fields: string[] = only.split(',')
    fields.forEach((f: string) => output[f] = data[f])
  } else {
    output = data
  }

  return output
}

export {
  parseOutput,
}

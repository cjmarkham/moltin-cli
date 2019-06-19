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
    if (Array.isArray(data)) {
      output = []
      for (const d of data) {
        const resource = {}
        fields.forEach((f: string) => resource[f] = d[f])
        output.push(resource)
      }
    } else {
      fields.forEach((f: string) => output[f] = data[f])
    }
  } else {
    output = data
  }

  return output
}

export {
  parseOutput,
}

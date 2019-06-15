const getStdin = async (): Promise<object> => {
  const { stdin } = process

  return new Promise(resolve => {
    let result: string

    if (stdin.isTTY) {
      resolve({})
      return;
    }

    stdin.setEncoding('utf8')

    stdin.on('data', (data) => {
      result = data
    })

    stdin.on('end', () => {
      resolve(JSON.parse(result))
    })
  })
}

export {
  getStdin,
}

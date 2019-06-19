import chalk from 'chalk'

const statusColor = (status: number) => {
  let color: string = 'whiteBright'

  switch (true) {
    case status >= 200 && status < 300:
      color = 'greenBright'
      break
    case status >= 400 && status < 500:
      color = 'yellowBright'
      break
    case status >= 500:
      color = 'redBright'
      break
  }

  return chalk[color](status)
}

export {
  statusColor,
}

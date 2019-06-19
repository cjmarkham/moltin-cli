import chalk from 'chalk'

const panic = (errors: object) => {
  for (const key in errors) {
    const error = errors[key]
    console.log(`${statusColor(error.status)}: ${chalk.whiteBright(error.title)}`)
    console.log(`     ${error.detail}`)
  }
}

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

const log = (status: number, title: string, data?: object) => {
  console.log(`${statusColor(status)}: ${chalk.whiteBright(title)}`)
  console.log(data)
}

export {
  panic,
  log,
}

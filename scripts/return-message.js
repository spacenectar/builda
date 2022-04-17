const chalk = require('chalk')

module.exports = returnMessage = (message, type) => {

  let prefix = '';
  let colour = '';

  switch (type) {
    case 'primary':
      colour = 'magenta'
      break;
    case 'launch':
      prefix = '🚀 '
      colour = 'green'
      break;
    case 'error':
      prefix = '🚨  '
      colour = 'red'
      break;
    case 'success':
      prefix = '✅ '
      colour = 'green'
      break;
    case 'warning':
      prefix = `⚠️  `
      colour = 'orange'
      break;
    case 'notice':
      prefix = `💬 `
      colour = 'cyan'
      break;
    default:
      colour = 'white'
      break;
  }

  const output = type ? chalk.keyword(colour)(`${prefix} ${message}`) : message

  return console.log(output)
}

module.exports =  changeCase = (str, type) => {
  if (type === 'sentence') {
    const string = str.replace(/([A-Z])/g, ' $1').toLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1)
  } else if (type === 'kebab') {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  } else if (type === 'pascal') {
    return str.split('-').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join('')
  }
}

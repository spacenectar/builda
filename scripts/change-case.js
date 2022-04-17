module.exports =  changeCase = (input, type) => {
  const str = input.replace(/[,_]/g, ' ').replace(/&/g, ' and ').replace(/@/g, ' at ').replace(/\s+/g, '-').trim();
  let output = '';
  if (type === 'sentence') {
    // Output the component name however they provided it
    output = input
  } else if (type === 'kebab') {
    output = str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
  } else if (type === 'pascal') {
    output = str.split('-').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join('')
  }

  return output
}

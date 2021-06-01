module.exports = getCSSExt = (ssheet, modules) => {
  const out = ssheet === 'stylus' ? 'styl' : ssheet
  return modules === undefined || !modules ? out.toLowerCase() : `module.${out.toLowerCase()}`
}
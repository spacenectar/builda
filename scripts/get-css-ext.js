module.exports = getCSSExt = (ssheet, modules) => {
  let ext = '';
  switch (ssheet) {
    case 'none':
      ext = 'css';
      break;
    case 'stylus':
      ext = 'styl';
      break;
    default:
      ext = ssheet;
      break;
  }
  return !modules ? ext.toLowerCase() : `module.${ext.toLowerCase()}`
}

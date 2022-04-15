#! /usr/bin/env node

const returnMessage = require('./scripts/return-message')
const comGen = require('./scripts/component-generator')
const getConfig = require('./scripts/get-config');

// Generate the component
getConfig().then(configs => configs.forEach(config => comGen(config)));

returnMessage('=============================================', {color: 'magenta'})
returnMessage('BuildCom_\r', { color: 'magenta'})
returnMessage(`Component builder`, { color: 'white'})
returnMessage('=============================================\n', {color: 'magenta'})





#! /usr/bin/env node

const returnMessage = require('./scripts/return-message')
const comGen = require('./scripts/component-generator')
const getConfig = require('./scripts/get-config');

returnMessage(`\n`)
returnMessage('=============================================', 'primary')
returnMessage('BuildCom_', 'primary')
returnMessage(`Component builder`, 'primary')
returnMessage('=============================================\n', 'primary')

// Generate the component
getConfig().then(configs => configs.forEach(config => comGen(config)));




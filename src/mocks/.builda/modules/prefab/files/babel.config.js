module.exports = {
  presets: ['next/babel', '@babel/preset-typescript'],
  plugins: [
    'babel-plugin-named-exports-order',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
  ]
};

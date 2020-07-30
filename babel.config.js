const presets = [
    ['@babel/preset-env']
];
const plugins= [
    "@babel/syntax-dynamic-import",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-async-to-generator"
];
module.exports = {presets, plugins};

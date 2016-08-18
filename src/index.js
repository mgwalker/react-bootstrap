const fs = require('fs-extra-promise');
const _exec = require('child_process').exec;
const exec = (...args) => {
  return new Promise(resolve => {
    _exec(...args, (err, stdout, stderr) => {
      resolve(err, stdout, stderr);
    });
  });
};

const devModules = [
  "babel",
  "babel-preset-es2015",
  "babel-preset-react",
  "babelify",
  "browserify",
  "eslint",
  "eslint-config-airbnb",
  "eslint-plugin-import",
  "eslint-plugin-jsx-a11y",
  "eslint-plugin-react",
  "node-sass",
  "react",
  "react-dom",
  "react-redux",
  "redux",
  "updeep",
  "watchify"
];

process.exit(0);

exec(`npm install --save-dev ${devModules.join(' ')}`)
  .then(() => {
    return exec('mkdir -p web');
  })
  .then(() => {
    return exec('mkdir -p web/src');
  })
  .then(() => {
    return exec('mkdir -p web/bin');
  })
  .then(() => {
    return exec('mkdir -p web/src/containers');
  })
  .then(() => {
    return exec('mkdir -p web/src/presentation');
  })
  .then(() => {
    return exec('mkdir -p web/src/reducers');
  })
  .then(() => {
    return exec('mkdir -p web/src/style');
  })
  .then(() => {
    return fs.copySync(`${__dirname}/eslintrc.json`, '.eslintrc');
  })
  .then(() => {
    return fs.writeFileSync('package.json', JSON.stringify(pkg, false, '  '));
  })

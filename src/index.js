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
    return fs.copySync(`${__dirname}/..copy/eslintrc.json`, '.eslintrc');
  })
  .then(() => {
    return fs.copySync(`${__dirname}/..copy/bin-index.html`, 'web/bin/index.html');
  })
  .then(() => {
    return fs.copySync(`${__dirname}/..copy/src-index.js`, 'web/src/index.js');
  })
  .then(() => {
    return fs.copySync(`${__dirname}/..copy/src-store.js`, 'web/src/store.js');
  })
  .then(() => {
    return fs.copySync(`${__dirname}/..copy/src-reducers-index.js`, 'web/src/reducers/index.js');
  })
  .then(() => {
    return exec('touch web/src/style/main.scss');
  })
  .then(() => {
    const pkg = require(`${process.cwd()}/package`);
    pkg.scripts['lint'] = "eslint --fix 'web/src/**/*.js' && eslint --fix 'server/**/*.js'";
    pkg.scripts['build-style'] = "node-sass web/src/style/main.scss -o web/bin";
    pkg.scripts['build-html'] = "browserify -d -t [ babelify --presets [ react es2015 ] ] web/src/index.js -o web/bin/bundle.js";
    pkg.scripts['build'] = "npm run build-style && npm run build-html";
    pkg.scripts['watch-style'] = "node-sass -w web/src/style/ -o web/bin --include-path `node sass-paths.js`";
    pkg.scripts['watch-js'] = "watchify -v -d -t [ babelify --presets [ react es2015 ] ] web/src/index.js -o web/bin/bundle.js";
    pkg.scripts['watch'] = "npm run watch-js & npm run watch-style && fg";

    return fs.writeFileSync('package.json', JSON.stringify(pkg, false, '  '));
  })

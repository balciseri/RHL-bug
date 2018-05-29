const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname)));

app.get('*', (req, res, next) => {
  const filename = path.join(__dirname, '/dist/index.html');
  console.log(filename);
  // eslint-disable-next-line consistent-return
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});
app.listen(3001, () => console.log('App listening on port 3001!'));

#! /usr/bin/env node

const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(
  path.resolve(__dirname, 'build'),
  {
    // silent: false,
  },
  function (err) {
    if (err) throw err;

    console.log('publish ok');
  }
);

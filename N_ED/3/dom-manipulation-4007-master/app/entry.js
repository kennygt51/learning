'use strict';
const $ = require('jquery');
const block = $('#block');
const scalingButton = $('#scaling-button');
const movingButton = $("#movingButton")

scalingButton.click(() => {
  block.animate({ width: '200pt', height: '200pt' }, 2000);
  block.animate({ width: '100pt', height: '100pt' }, 2000);
});

movingButton.click(() => {
  block.animate({ 'marginLeft': '500px' },2000);
  block.animate({ 'marginLeft': '20px' },2000);
});

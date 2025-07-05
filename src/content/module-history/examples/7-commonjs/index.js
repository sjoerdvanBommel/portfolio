// [!code word:require]
var jQuery = require('jquery');

function init() {
  jQuery('#app').html('Hello, world!');
}

// [!code word:module.exports]
module.exports = { init: init };

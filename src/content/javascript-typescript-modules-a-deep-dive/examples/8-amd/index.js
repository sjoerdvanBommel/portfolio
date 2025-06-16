// [!code word:define]
define(['jquery'], function (jQuery) {
  function init() {
    jQuery('#app').html('Hello, world!');
  }

  return {
    init: init,
  };
});

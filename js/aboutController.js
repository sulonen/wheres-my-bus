(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('main > section').hide();
    $('#about').show();
    scroll(0,0);
  };

  module.aboutController = aboutController;
})(window);

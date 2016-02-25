(function(module) {
  var homeController = {};

  homeController.index = function() {
    $('main > section').hide();
    $('#request').show();
    $('#location').show();
    scroll(0,0);
  };

  module.homeController = homeController;
})(window);

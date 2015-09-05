(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('angularTouchWidgets.config', ['ionic'])
      .value('angularTouchWidgets.config', {
          debug: true
      });

  // Modules
  angular.module('angularTouchWidgets.directives', []);
  angular.module('angularTouchWidgets',
      [
          'angularTouchWidgets.config',
          'angularTouchWidgets.directives'
      ]);

})(angular);

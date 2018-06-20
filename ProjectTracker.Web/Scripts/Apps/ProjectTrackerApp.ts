angular.module("ProjectTrackerApp", ['ngResource', 'ngRoute']);

angular.module("ProjectTrackerApp").config(['$compileProvider', '$routeProvider', function ($compileProvider, $routeProvider) {
    $compileProvider.debugInfoEnabled(false);
    $routeProvider
        .when('/', {
            template: '<project-tracker></project-tracker>'
        })
}]);

    

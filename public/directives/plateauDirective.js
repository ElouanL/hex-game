'use strict';

app.directive('plateau', function () {
    return {
        restrict: 'E',
        templateUrl: "views/plateau.html",
        controller: "PlateauController"
    }
});

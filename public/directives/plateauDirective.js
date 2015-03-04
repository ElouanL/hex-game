'use strict';

var plateauHtml = "<p>Bonjour</p>";

app.directive('plateau', function () {
    return {
        template: plateauHtml
    }
});
app.directive('case', function () {
    return{
        restrict: 'E',
        templateUrl: "views/plateau.html"
    }
});

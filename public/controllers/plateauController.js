/**
 * Created by Elouan on 28/02/2015.
 */
app.controller('MainController', function($scope){
    $scope.caseTable = [
        {
            ligne:1,
            colonne:1
        },
        {
            ligne:1,
            colonne:2
        },
        {
            ligne:1,
            colonne:3
        },
        {
            ligne:2,
            colonne:1
        },
        {
            ligne:2,
            colonne:2
        },
        {
            ligne:2,
            colonne:3
        },
        {
            ligne:3,
            colonne:1
        },
        {
            ligne:3,
            colonne:2
        },
        {
            ligne:3,
            colonne:3
        }
    ];

    $scope.width = function(ligne){
        var multi = 20+(ligne*2);

        return ligne * multi;
    };
    $scope.ouou = 'Comment ca va ?';
    $scope.couleur = 'green';

});
app.controller('PlateauController', function($scope){

});
/**
 * Created by Elouan on 28/02/2015.
 */
app.controller('MainController', function($scope){

    $scope.caseTable = [
        {
            ligne:1,
            colonne:1,
            couleur:"white"
        },
        {
            ligne:1,
            colonne:2,
            couleur:"white"
        },
        {
            ligne:1,
            colonne:3,
            couleur:"white"
        },
        {
            ligne:2,
            colonne:1,
            couleur:"white"
        },
        {
            ligne:2,
            colonne:2,
            couleur:"white"
        },
        {
            ligne:2,
            colonne:3,
            couleur:"white"
        },
        {
            ligne:3,
            colonne:1,
            couleur:"white"
        },
        {
            ligne:3,
            colonne:2,
            couleur:"white"
        },
        {
            ligne:3,
            colonne:3,
            couleur:"white"
        },
        {
            ligne:4,
            colonne:1,
            couleur:"white"
        },
        {
            ligne:4,
            colonne:2,
            couleur:"white"
        },
        {
            ligne:4,
            colonne:3,
            couleur:"white"
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

app.controller('2joueursController', function($scope){
    $scope.test = "bonjour !";
});
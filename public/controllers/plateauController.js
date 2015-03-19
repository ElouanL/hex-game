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

    $scope.caseTableToPlateau = function(){
        var plateau = [];
        var ligne = [];
        $scope.caseTable.forEach(function(c, i){
            if($scope.caseTable[i-1] && c.ligne > $scope.caseTable[i-1].ligne){
                plateau.push(ligne);
                ligne = [];
            }
            ligne.push(c.couleur);
        });
        return plateau
    };

    $scope.plateauToCaseTable = function(table){
        $scope.caseTable = [];
        table.forEach(function(c, i){
            c.forEach(function(couleur, j){
                caseTable.push({
                    ligne: i,
                    colonne: j,
                    couleur: couleur
                });
            });
        });
    };

});
app.controller('PlateauController', function($scope){

});

app.controller('2joueursController', function($scope){
    $scope.test = "bonjour !";
});
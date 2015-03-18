/**
 * Created by Elouan on 28/02/2015.
 */

app.controller('2joueursController', function($scope){
    $scope.test = "bonjour !";
    $scope.joueur = "blue";

    $scope.jouer = function(i){
        if ($scope.caseTable[i].couleur == "white"){
            $scope.caseTable[i].couleur = $scope.joueur;
            $scope.joueur = ($scope.joueur == "blue") ? "yellow" : "blue";
        }
    };
});
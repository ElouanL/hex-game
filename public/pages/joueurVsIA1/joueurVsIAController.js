/**
 * Created by Elouan on 17/03/2015.
 */
app.controller('JoueurVsIA1Controller', function($scope){
        $scope.joueur = "blue";

        $scope.jouer = function(i){
            if ($scope.caseTable[i].couleur == "white"){
                $scope.caseTable[i].couleur = $scope.joueur;
                $scope.jouerIA();
            }
        };
});
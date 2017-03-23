/**
 * Created by Elouan on 28/02/2015.
 */

app.controller('2joueursController', function($scope){
    $scope.joueur = "blue";


    $scope.$watch('tailleCaseTable', function(){
        var taillePlateau = $scope.tailleCaseTable;

        $scope.generateurTable();


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
            plateau.push(ligne);
            return plateau
        };

        $scope.plateauToCaseTable = function(table){
            $scope.caseTable = [];
            table.forEach(function(c, i){
                c.forEach(function(couleur, j){
                    $scope.caseTable.push({
                        ligne: i,
                        colonne: j,
                        couleur: couleur
                    });
                });
            });
        };

        var ColorEnum = {
            BLUE : 'blue',
            YELLOW : 'yellow',
            NONE : 'white'
        };

        var gagnant = function (){
            var mPlateau = $scope.caseTableToPlateau();

            var i, j, couleur;
            i=0;
            j=0;
            couleur = ColorEnum.YELLOW;

            var plateauCopie = mPlateau.slice();
            for(i=0 ; i<taillePlateau ; i++) {
                if (parcourCases(i, j, couleur, plateauCopie)) {
                    return ColorEnum.YELLOW;
                }
            }

            i=0;
            j=0;
            plateauCopie = mPlateau.slice();
            couleur = ColorEnum.BLUE;
            for(j=0 ; j<taillePlateau ; j++) {
                if (parcourCases(i, j, couleur, plateauCopie)) {
                    return ColorEnum.BLUE;
                }
            }

            return ColorEnum.NONE;
        };

        function parcourCases(i, j, couleur, plateauCopie) {
            if(i>=0 && i<taillePlateau && j>=0 && j<taillePlateau) {
                if((plateauCopie[i][j] == ColorEnum.YELLOW && couleur == ColorEnum.YELLOW && j==taillePlateau-1) ||
                    (plateauCopie[i][j] == ColorEnum.BLUE && couleur == ColorEnum.BLUE && i==taillePlateau-1))
                {
                    return true;
                }else{
                    if(couleur == plateauCopie[i][j]){
                        var newPlateau = plateauCopie.slice();
                        newPlateau[i][j] = ColorEnum.NONE;
                        for(var k=-1; k<=1; k++){
                            for(var l=-1; l<=1; l++){
                                if(k!=l){
                                    if(parcourCases(i+k, j+l, couleur, newPlateau)){
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return false;
        }

        $scope.jouer = function(i){
            if ($scope.caseTable[i].couleur == "white"){
                $scope.caseTable[i].couleur = $scope.joueur;
                $scope.joueur = ($scope.joueur == "blue") ? "yellow" : "blue";
                var gagn = gagnant();
                if(gagn!='white'){
                    alert('Player ' + gagn + ' win !')
                };
            }
        };
    });


});
/**
 * Created by Elouan on 28/02/2015.
 */

app.controller('2joueursController', function($scope){
    $scope.test = "bonjour !";
    $scope.joueur = "blue";


    var infinite = 99999;
    var taillePlateau = 3;
    var plateau = new Array();

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
        }
    ];

    $scope.width = function(ligne){
        var multi = 20+(ligne*2);

        return ligne * multi;
    };

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
        RED : 'blue',
        GREEN : 'yellow',
        NONE : 'white'
    };

    var gagnant = function (){
        var mPlateau = $scope.caseTableToPlateau();

        var i, j, couleur;
        i=0;
        j=0;
        couleur = ColorEnum.GREEN;

        var plateauCopie;// = new Array();
        plateauCopie = mPlateau;
        for(i=0 ; i<taillePlateau ; i++) {
            if (parcourCases(i, j, couleur, plateauCopie)) {
                return ColorEnum.GREEN;
            }
        }

        plateauCopie = mPlateau;
        couleur = ColorEnum.RED;
        for(j=0 ; j<taillePlateau ; j++) {
            if (parcourCases(i, j, couleur, plateauCopie)) {
                return ColorEnum.RED;
            }
        }

        return ColorEnum.NONE;
    };

    function parcourCases(i, j, couleur, plateauCopie) {
        if(i>=0 && i<taillePlateau && j>=0 && j<taillePlateau) {
            if((plateauCopie[i][j] == ColorEnum.GREEN && j==taillePlateau-1) ||
                (plateauCopie[i][j] == ColorEnum.RED && i==taillePlateau-1))
            {
                return true;
            }else{
                if(couleur == plateauCopie[i][j]){
                    plateauCopie[i][j] = ColorEnum.NONE;
                    for(var k=-1; k<=1; k++){
                        for(var l=-1; l<=1; l++){
                            if((k!=l) || i==0 || j==0){
                                if(parcourCases(i+k, j+l, couleur)){
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
            alert(gagnant());
        }
    };


});
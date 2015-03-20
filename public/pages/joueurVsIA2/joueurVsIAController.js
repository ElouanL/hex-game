/**
 * Created by Elouan on 17/03/2015.
 */
app.controller('JoueurVsIA2Controller', function($scope){
    $scope.joueur = "blue";
    $scope.tailleCaseTable  = 4;

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
            ligne:1,
            colonne:4,
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
            ligne:2,
            colonne:4,
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
            ligne:3,
            colonne:4,
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
        },
        {
            ligne:4,
            colonne:4,
            couleur:"white"
        }
    ];

    var infinite = 99999;
    var taillePlateau = 4;

    var ColorEnum = {
        BLUE : 'blue',
        YELLOW : 'yellow',
        NONE : 'white'
    };

    var gagnant = function (mPlateau){
        //var mPlateau = $scope.caseTableToPlateau();

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
                            if((k!=l) || i==0 || j==0){
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

    function coordonneeToCaseTable(ligne, colonne){
        var index = ligne*taillePlateau;
        index += colonne;
        return index;
    }

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
        return plateau;
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

    function scoreCaseTable(){
        var milieux = $scope.tailleCaseTable/2;

        $scope.caseTable.forEach(function(laCase){
            if(laCase.colonne<milieux){
                laCase.tableScore = laCase.colonne;
            }else{
                laCase.tableScore = $scope.tailleCaseTable-laCase.colonne;
            }
        });
    }

    function meilleurScoreRandom(){
        var indiceMeilleurScore = 0;
        var meilleurScore = 0;

        $scope.caseTable.forEach(function(laCase,i){
            if(meilleurScore < laCase.tableScore && laCase.couleur == 'white'){
                indiceMeilleurScore = i;
                meilleurScore = laCase.tableScore;
            }
        });

        $scope.caseTable[indiceMeilleurScore].couleur = 'yellow';
    }

    function jouerIA2(){

    }

    $scope.jouer = function(i){
        if ($scope.caseTable[i].couleur == "white"){
            $scope.caseTable[i].couleur = $scope.joueur;

            //jouerIA2();
            scoreCaseTable();
            meilleurScoreRandom();

            var gagn = gagnant($scope.caseTableToPlateau());
            if(gagn!='white'){
                alert('les ' + gagn + ' gagne')
            }
        }
    };
});
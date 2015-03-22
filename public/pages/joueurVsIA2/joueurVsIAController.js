/**
 * Created by Elouan on 17/03/2015.
 */
app.controller('JoueurVsIA2Controller', function($scope){
    $scope.joueur = "yellow";
    
    $scope.tailleCaseTable = 9;
    $scope.generateurTable = function(){
        var nombreCase = Math.pow($scope.tailleCaseTable,2)-1;
        $scope.caseTable = [];
        var l = 1;
        var c = 1;
        //Pour toutes les cases du plateau
        for(var i = 0; i<=nombreCase; i++){
            var laCase = {
                ligne : l,
                colonne : c,
                couleur : "white"
            };
            //Passer a la ligne
            if(laCase.colonne==$scope.tailleCaseTable){
                c=0;
                l++;
            }
            $scope.caseTable.push(laCase);
            c++;
        }
    };

    $scope.caseTable.forEach(function(laCase){
        laCase.tableScore = 1;
    });

    var infinite = 99999;
    var taillePlateau = $scope.tailleCaseTable;

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
                laCase.tableScore += laCase.colonne;
            }else{
                laCase.tableScore += $scope.tailleCaseTable-laCase.colonne;
            }
            if(laCase.ligne<milieux){
                laCase.tableScore += laCase.ligne;
            }else{
                laCase.tableScore += $scope.tailleCaseTable-laCase.ligne;
            }
        });
    }

    //Retourne l'indice de la case autour d'un cercle en partant de 0 : en haut à gauche
    function tourDuneCase(indice, numTour){
        switch(numTour){
            case 0:
                return indice - $scope.tailleCaseTable;
            case 1:
                if($scope.caseTable[indice].colonne!=$scope.tailleCaseTable){
                    return indice - $scope.tailleCaseTable + 1;
                }else{
                    return -1;
                }
                //return indice - $scope.tailleCaseTable + 1;
            case 2:
                if($scope.caseTable[indice].colonne!=$scope.tailleCaseTable){
                    return indice + 1;
                }else{
                    return -1;
                }
                //return indice + 1;
            case 3:
                return indice + $scope.tailleCaseTable;
            case 4:
                if($scope.caseTable[indice].colonne!=1){
                    return indice + $scope.tailleCaseTable - 1;
                }else{
                    return -1;
                }
            case 5:
                if($scope.caseTable[indice].colonne!=1){
                    return indice - 1;
                }else{
                    return -1;
                }
            default: return -1;
        }

    }

    function premierCercle(){
        $scope.caseTable.forEach(function(laCase, i){
            if(laCase.couleur=='white'){
                var iCase = tourDuneCase(i, 0);
                if($scope.caseTable[iCase]){
                    switch ($scope.caseTable[iCase].couleur){
                        case 'white':
                            break;
                        case 'yellow':
                            laCase.tableScore += 5;
                            break;
                        case 'blue':
                            laCase.tableScore += 10;
                            break;
                        default:
                            break;
                    }
                }
                iCase = tourDuneCase(i, 1);
                if($scope.caseTable[iCase]){
                    switch ($scope.caseTable[iCase].couleur){
                        case 'white':

                            break;
                        case 'yellow':
                            laCase.tableScore += 5;
                            break;
                        case 'blue':
                            laCase.tableScore += 10;
                            break;
                        default:
                            break;
                    }
                }
                iCase = tourDuneCase(i, 2);
                if($scope.caseTable[iCase]){
                    switch ($scope.caseTable[iCase].couleur){
                        case 'white':
                            break;
                        case 'yellow':
                            laCase.tableScore += 10;
                            break;
                        case 'blue':
                            laCase.tableScore += 5;
                            break;
                        default:
                            break;
                    }
                }
                iCase = tourDuneCase(i, 3);
                if($scope.caseTable[iCase]){
                    switch ($scope.caseTable[iCase].couleur){
                        case 'white':

                            break;
                        case 'yellow':
                            laCase.tableScore += 5;
                            break;
                        case 'blue':
                            laCase.tableScore += 10;
                            break;
                        default:
                            break;
                    }
                }
                iCase = tourDuneCase(i, 4);
                if($scope.caseTable[iCase]){
                    switch ($scope.caseTable[iCase].couleur){
                        case 'white':

                            break;
                        case 'yellow':
                            laCase.tableScore += 5;
                            break;
                        case 'blue':
                            laCase.tableScore += 10;
                            break;
                        default:
                            break;
                    }
                }
                iCase = tourDuneCase(i, 5);
                if($scope.caseTable[iCase]){
                    switch ($scope.caseTable[iCase].couleur){
                        case 'white':

                            break;
                        case 'yellow':
                            laCase.tableScore += 10;
                            break;
                        case 'blue':
                            laCase.tableScore += 5;
                            break;
                        default:
                            break;
                    }
                }
            }
        });
    }

    function meilleurScore(){
        var indiceMeilleurScore = 0;
        var meilleurScore = 0;

        $scope.caseTable.forEach(function(laCase,i){
            if(meilleurScore <= laCase.tableScore && laCase.couleur == 'white'){
                indiceMeilleurScore = i;
                meilleurScore = laCase.tableScore;
            }
        });

        $scope.caseTable[indiceMeilleurScore].couleur = 'blue';
    }

    function jouerIA2(){

    }

    $scope.jouer = function(i){
        if ($scope.caseTable[i].couleur == "white"){
            $scope.caseTable[i].couleur = $scope.joueur;

            var g = gagnant($scope.caseTableToPlateau());
            if(g!='white'){
                alert('les ' + g + ' gagne')
            }

            //jouerIA2();
            //init tableScore
            $scope.caseTable.forEach(function(laCase){
                laCase.tableScore = 1;
            });

            //Scoring
            scoreCaseTable();
            premierCercle();
            meilleurScore();


            var gagn = gagnant($scope.caseTableToPlateau());
            if(gagn!='white'){
                alert('les ' + gagn + ' gagne')
            }
        }
    };
});
/**
 * Created by Elouan on 17/03/2015.
 */
app.controller('JoueurVsIA1Controller', function($scope){
    $scope.joueur = "blue";

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
        var i, j, couleur;
        i=0;
        j=0;
        couleur = ColorEnum.YELLOW;

        var plateauCopie = [];
        angular.copy(mPlateau, plateauCopie);
        for(i=0 ; i<taillePlateau ; i++) {
            if (parcourCases(i, j, couleur, plateauCopie)) {
                return ColorEnum.YELLOW;
            }
        }

        i=0;
        j=0;
        plateauCopie = [];
        angular.copy(mPlateau, plateauCopie);
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
                    var newPlateau = [];
                    angular.copy(plateauCopie, newPlateau);
                    newPlateau[i][j] = ColorEnum.NONE;
                    for(var k=-1; k<=1; k++){
                        for(var l=-1; l<=1; l++){
                            if(k!=l || i==0 || j==0){
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



    var jouerIA = function (mPlateau) {
        var plateauCopie = [];
        angular.copy(mPlateau, plateauCopie);

        var couleur = ColorEnum.YELLOW;

        var listeCasesValeur = [];

        for(var i=0 ; i<taillePlateau ; i++) {
            for(var j=0 ; j<taillePlateau ; j++) {
                if (mPlateau[i][j] == ColorEnum.NONE) {
                    var valeur = alphabeta(plateauCopie, i, j, 4, -infinite, infinite, couleur);
                    listeCasesValeur.push({ligne : i, colonne : j, valeur : valeur});
                }
            }
        }

        return listeMin(listeCasesValeur);
    };

    function listeMin(listeCasesValeur) {
        var listeMini = [];
        var minVal = +infinite;

        listeCasesValeur.forEach(function (element) {
            if(element.valeur < minVal){
                listeMini = [];
                minVal = element.valeur;
                listeMini.push(element);
            } else if(element.valeur == minVal){
                listeMini.push(element);
            }
        });

        if(listeMini.length == 1){
            return listeMini[0];
        } else {
            var elemNum = Math.floor(Math.random() * listeMini.length);
            return listeMini[elemNum];
        }
    }

    function alphabeta(plateau, posI, posJ, depth, alpha, beta, player) {
        if (depth <= 0 || posI==0 || posJ==0 || posI==taillePlateau-1 || posJ==taillePlateau-1)
            return heuristic(plateau, posI, posJ, player);

        if (player == ColorEnum.BLUE) { //Joueur humain
            var v = -infinite;

            for(var k=-1; k<=1; k++) {
                for (var l = -1; l <= 1; l++) {
                    if((k!=l) || k==0 || l==0){
                        v = max(v, alphabeta(plateau, posI+k, posJ+l, depth - 1, alpha, beta, player));
                        alpha = max(alpha, v);
                        if (beta <= alpha)
                            return v;
                    }
                }
            }

            return v;
        } else { //Joueur IA
            var v = infinite;

            for(var k=-1; k<=1; k++) {
                for (var l = -1; l <= 1; l++) {
                    if ((k != l) || k == 0 || l == 0) {
                        v = min(v, alphabeta(plateau, posI+k, posJ+l, depth - 1, alpha, beta, player));
                        beta = min(beta, v);
                        if (beta <= alpha)
                            return v;
                    }
                }
            }

            return v;
        }
    }

    function heuristic(plateau, posI, posJ, player) {
        var plateauC = [];
        angular.copy(plateau, plateauC);
        plateauC[posI][posJ]=player;
        var victorious = gagnant(plateauC);

        if(victorious == ColorEnum.YELLOW)
            return -6000;
        if(victorious == ColorEnum.BLUE)
            return 6000;


        if(victorious == ColorEnum.YELLOW && (posI==0 || posI==taillePlateau-1))
            return -3000;
        if(victorious == ColorEnum.BLUE && (posJ==0 || posJ==taillePlateau-1))
            return 3000;

        if(plateau[posI][posJ] == ColorEnum.YELLOW)
            return -3000;
        if(plateau[posI][posJ] == ColorEnum.BLUE)
            return 3000;
        if(plateau[posI][posJ] == ColorEnum.NONE)
            return -1500;

        return 0;
    }

    function max(x, y) {
        if(x<y)
            return y;
        else
            return x;
    }

    function min(x, y) {
        if(x<y)
            return x;
        else
            return y;
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

    $scope.jouer = function(i){
        if ($scope.caseTable[i].couleur == "white"){
            $scope.caseTable[i].couleur = $scope.joueur;

            var unPlateau = $scope.caseTableToPlateau();

            var coordonnee = jouerIA($scope.caseTableToPlateau());
            var index = coordonneeToCaseTable(coordonnee.ligne, coordonnee.colonne);
            $scope.caseTable[index].couleur = 'yellow';
            var gagn = gagnant($scope.caseTableToPlateau());
            if(gagn!='white'){
                alert('les ' + gagn + ' gagne')
            }
        }
    };
});
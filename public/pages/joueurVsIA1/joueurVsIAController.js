/**
 * Created by Elouan on 17/03/2015.
 */
app.controller('JoueurVsIA1Controller', function($scope){
    $scope.joueur = "blue";


    var infinite = 99999;
    var taillePlateau = 4;


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


    $scope.width = function(ligne){
        var multi = 20+(ligne*2);
        return ligne * multi;
    };

    $scope.caseTableToPlateau = function(){
        var plateau = [];
        var ligne = [];

        //console.log($scope.caseTable);
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



    var jouerIA = function () {
        var mPlateau = $scope.caseTableToPlateau();
        var plateauCopie = mPlateau.slice();
        console.log("plateau : " + mPlateau);

        var couleur = ColorEnum.YELLOW;

        var listeCasesValeur = [];

        for(var i=0 ; i<taillePlateau ; i++) {
            for(var j=0 ; j<taillePlateau ; j++) {
                if (mPlateau[i][j] == ColorEnum.NONE) {
                    //console.log("a plateau : " + mPlateau);
                    var valeur = alphabeta(plateauCopie, i, j, 2, -infinite, infinite, couleur);
                    //console.log("b plateau : " + mPlateau);
                    listeCasesValeur.push({ligne : i, colonne : j, valeur : valeur});
                }
            }
        }

        var caseJeu = listeMin(listeCasesValeur);
        console.log(caseJeu);
        console.log("plateau : " + mPlateau);
        console.log("copie : " + plateauCopie);
        mPlateau[caseJeu.ligne][caseJeu.colonne] = couleur;

        console.log("plateau : " + mPlateau);

        return mPlateau;
    }

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

        if(listeMin.length = 1){
            return listeMini[0];
        } else {
            var elemNum = Math.floor(Math.random() * listeMin.length);
            return listeMini[elemNum];
        }
    }

    function alphabeta(plateau, posI, posJ, depth, alpha, beta, player) {
        if (depth = 0 || posI==0 || posJ==0 || posI==taillePlateau-1 || posJ==taillePlateau-1)
            return heuristic(plateau, posI, posJ, player);

        if (player == ColorEnum.YELLOW) { //Joueur humain
            var v = -infinite;

            for(var k=-1; k<=1; k++) {
                for (var l = -1; l <= 1; l++) {
                    if((k!=l) || k==0 || l==0){
                        v = max(v, alphabeta(plateau, posI+k, posJ+l, depth - 1, alpha, beta, false));
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
                        v = min(v, alphabeta(plateau, posI+k, posJ+l, depth - 1, alpha, beta, true));
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
        var plateauC = plateau.slice();
        plateauC[posI][posJ]=player;
        var victorious = gagnant(plateauC);

        if(victorious == ColorEnum.YELLOW)
            return 3000;
        if(victorious == ColorEnum.BLUE)
            return -3000;


        if(victorious == ColorEnum.YELLOW && (posI==0 || posI==taillePlateau-1))
            return 3000;
        if(victorious == ColorEnum.BLUE && (posJ==0 || posJ==taillePlateau-1))
            return -3000;

        if(plateau[posI][posJ] == ColorEnum.YELLOW)
            return 3000;
        if(plateau[posI][posJ] == ColorEnum.BLUE)
            return -3000;
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


    $scope.jouer = function(i){
        if ($scope.caseTable[i].couleur == "white"){
            $scope.caseTable[i].couleur = $scope.joueur;
            jouerIA();

            var plateau = $scope.caseTableToPlateau();
            var gagn = gagnant(plateau);
            if(gagn!='white'){
                alert('les ' + gagn + ' gagne')
            };
        }
    };
});
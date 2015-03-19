/**
 * Created by Elouan on 28/02/2015.
 */
app.controller('MainController', function($scope){

    var infinite = 99999;
    var taillePlateau = 4;
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
                $scope.caseTable.push({
                    ligne: i,
                    colonne: j,
                    couleur: couleur
                });
            });
        });
    };

    $scope.jouerIA = function(){
        plateau = $scope.caseTableToPlateau();
        $scope.plateauToCaseTable(playIA());
    };

    var ColorEnum = {
        RED : 'blue',
        GREEN : 'yellow',
        NONE : 'white'
    };

    $scope.gagnant = function (){
        var mPlateau = $scope.caseTableToPlateau();

        var i, j, couleur;
        i=0;
        j=0;
        couleur = ColorEnum.GREEN;

        var plateauCopie;// = new Array();
        plateauCopie = mPlateau.copy();
        for(i=0 ; i<taillePlateau ; i++) {
            if (parcourCases(i, j, couleur, plateauCopie)) {
                return ColorEnum.GREEN;
            }
        }

        plateauCopie = mPlateau.copy();
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

    function playIA() {
        var plateauCopie = plateau.copy();

        var couleur = ColorEnum.RED;

        var listeCasesValeur = new Array();

        for(var i=0 ; i<taillePlateau ; i++) {
            for(var j=0 ; j<taillePlateau ; j++) {
                if (plateau[i][j] == ColorEnum.NONE) {
                    var valeur = alphabeta(plateauCopie, i, j, 4, -infinite, infinite, couleur);
                    listeCasesValeur.push({ligne : i, colonne : j, valeur : valeur});
                }
            }
        }

        var caseJeu = listeMin(listeCasesValeur);
        plateau[caseJeu.ligne][caseJeu.colonne] = couleur;
        return plateau;
    }

    function listeMin(listeCasesValeur) {
        var listeMin = new Array();
        var minVal = +infinite;

        listeCasesValeur.forEach(function (element) {
            if(element.valeur < minVal){
                listeMin.clear();
                minVal = element.valeur;
                listeMin.push(element);
            } else if(element.valeur == minVal){
                listeMin.push(element);
            }
        });

        if(listeMin.length = 1){
            return listeMin(0);
        } else {
            var elemNum = Math.floor(Math.random() * listeMin.length);
            return listeMin(elemNum);
        }
    }

    function alphabeta(plateau, posI, posJ, depth, alpha, beta, player) {
        if (depth = 0 || posI==0 || posJ==0 || posI==taillePlateau-1 || posJ==taillePlateau-1)
            return heuristic(plateau, posI, posJ, player);

        if (player == ColorEnum.GREEN) { //Joueur humain
            var v = -infinite;

            for(var k=-1; k<=1; k++) {
                for (var l = -1; l <= 1; l++) {
                    if((k!=l) || i==0 || j==0){
                        v = max(v, alphabeta(plateau, posI+i, posJ+j, depth - 1, alpha, beta, false));
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
                    if ((k != l) || i == 0 || j == 0) {
                        v = min(v, alphabeta(plateau, posI+i, posJ+j, depth - 1, alpha, beta, true));
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
        plateau[i][j]=player;
        var victorious = gagnant(plateau);

        if(victorious == ColorEnum.GREEN)
            return 3000;
        if(victorious == ColorEnum.RED)
            return -3000;


        if(victorious == ColorEnum.GREEN && (posI==0 || posI==taillePlateau-1))
            return 3000;
        if(victorious == ColorEnum.RED && (posJ==0 || posJ==taillePlateau-1))
            return -3000;

        if(plateau[posI][posJ] == ColorEnum.GREEN)
            return 3000;
        if(plateau[posI][posJ] == ColorEnum.RED)
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

});
app.controller('PlateauController', function($scope){

});

app.controller('2joueursController', function($scope){
    $scope.test = "bonjour !";
});
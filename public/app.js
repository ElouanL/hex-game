'use strict';

var app = angular.module('Hex', []);

var ColorEnum = {
    RED : 0,
    GREEN : 1,
    NONE : 2
};

var infinite = 99999;
var taillePlateau = 4;
var plateau = new Array();

function gagnant(mPlateau){
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
            return ColorEnum.GREEN;
        }
    }

    return ColorEnum.NONE;
}

function parcourCases(i, j, couleur, plateauCopie) {
    if(i>=0 && i<taillePlateau && j>=0 && j<taillePlateau) {
        if((plateauCopie[i,j] == ColorEnum.GREEN && j==taillePlateau-1) ||
            (plateauCopie[i,j] == ColorEnum.RED && i==taillePlateau-1))
        {
            return true;
        }else{
            if(couleur == plateauCopie[i, j]){
                plateauCopie[i,j] = ColorEnum.NONE;
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

//TODO : appel initial => alphabeta(origin, depth, -Infinity, Infinity, ColorEnum.GREEN)

function alphabeta(plateau, posI, posJ, depth, alpha, beta, player) {
    if (depth = 0 || posI==0 || posJ==0 || posI==taillePlateau-1 || posJ==taillePlateau-1)
        return heuristic(plateau, posI, posJ);

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

function heuristic(plateau, posI, posJ) {
    var victorious = gagnant(plateau);
    
    if(victorious == ColorEnum.GREEN)
        return 3000;
    if(victorious == ColorEnum.RED)
        return -3000;


    if(victorious == ColorEnum.GREEN && (posI==0 || posI==taillePlateau-1))
        return 3000;
    if(victorious == ColorEnum.RED && (posJ==0 || posJ==taillePlateau-1))
        return -3000;

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

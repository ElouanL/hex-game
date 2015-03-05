'use strict';

var app = angular.module('Hex', []);

var ColorEnum = {
    RED : 0,
    GREEN : 1,
    NONE : 2
};

var taillePlateau = 4;
var plateau = new Array();
var plateauCopie = new Array();

function gagnant(){
    var i, j, couleur;
    i=0;
    j=0;
    couleur = ColorEnum.GREEN;

    plateauCopie = plateau.copy();
    for(i=0 ; i<taillePlateau ; i++) {
        if (parcourCases(i, j, couleur)) {
            return ColorEnum.GREEN;
        }
    }

    plateauCopie = plateau.copy();
    couleur = ColorEnum.RED;
    for(j=0 ; j<taillePlateau ; j++) {
        if (parcourCases(i, j, couleur)) {
            return ColorEnum.GREEN;
        }
    }

    return ColorEnum.NONE;
}

function parcourCases(i, j, couleur) {
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
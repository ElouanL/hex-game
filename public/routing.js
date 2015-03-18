'user strict';

app.config(
    function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'blabla.html'
            })
            .when('/2joueurs', {
                controller: 'CommandeController',
                templateUrl: 'views/commercial/commande/commande.html'
            })
            .when('/joueurvsia1', {
                controller: 'BonCommandeController',
                templateUrl: 'views/commercial/commande/bon-commande.html'
            })
            .when('/joueurvsia2', {
                controller: 'ClientController',
                templateUrl: 'views/commercial/client/client.html'
            })
            .when('/iavsia', {
                controller: 'CommandeParProduitController',
                templateUrl: 'views/commercial/commandeParProduit/commandeParProduit.html'
            })
    }
);
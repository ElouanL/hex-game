'user strict';

app.config(
    function($routeProvider){
        $routeProvider
            .when('/', {
                controller: '2joueursController',
                templateUrl: 'pages/2joueurs/2joueurs.html'
            })
            .when('/2joueurs', {
                controller: '2joueursController',
                templateUrl: 'pages/2joueurs/2joueurs.html'
            })
            .when('/joueurvsia1', {
                controller: 'JoueurVsIA1Controller',
                templateUrl: 'pages/joueurVsIA1/joueurVsIA1.html'
            })
            .when('/joueurvsia2', {
                controller: 'JoueurVsIA2Controller',
                templateUrl: 'pages/joueurVsIA2/joueurVsIA2.html'
            })
            .when('/iavsia', {
                controller: 'IAvsIAController',
                templateUrl: 'pages/IAvsIA/IAvsIA.html'
            })
    }
);
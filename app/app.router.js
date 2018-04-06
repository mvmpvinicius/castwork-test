var castwork = angular.module('castwork', ['ngRoute', 'ui.bootstrap', 'angular-table', 'ngCookies']);
castwork.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/inicio', {
            templateUrl: 'app/components/inicio/inicio.view.html',
            controller: 'inicioController',
            controllerAs: 'inicioCtrl'
        })
        .when('/login', {
            templateUrl: 'app/components/login/login.view.html',
            controller: 'loginController',
            controllerAs: 'loginCtrl'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);

castwork.controller('appCtrl', function($scope, $rootScope, $location, $cookies) {

    $rootScope.verificaLogin = function() {

        if ($cookies.getObject('user_data') == undefined) {

            $location.path('/login');

        } else {

            $location.path('/inicio');

        }

    };

});

// Diretiva criada para permitir ativar funções via "enter". Exemplo: Ao escrever um item para lista e inserir pressionando enter.
castwork.directive('pressEnter', function() {
    return function(scope, element, attrs) {
        element.bind('keydown keypress', function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.pressEnter);
                });

                event.preventDefault();
            }
        });
    };
});
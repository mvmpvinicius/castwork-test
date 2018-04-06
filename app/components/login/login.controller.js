var castwork = angular.module('castwork');
castwork.controller('loginController', function($http, $scope, $rootScope, $location, $cookies) {

    $rootScope.verificaLogin();

    $scope.usuario = {};

    $scope.closeAlert = function() {

        $scope.show_alert_login = false;

    };

    $scope.login = function() {

        var data = {};
        data._f = 'login';
        data._p = {
            usuario: $scope.usuario
        };

        $http.post('ws/ajax.php', data).then(function successCallback(response) {

            if (response.data.status == 'logged_on') {

                $cookies.put('user_data', JSON.stringify(response.data.data));
                $rootScope.user_name = response.data.data.nome;
                $rootScope.auth = true;
                $location.path('/inicio');

            } else {

                $scope.callAlert('Usuário ou senha incorreta', 'danger');

            }

        }, function errorCallback(response) {

            // error

        });

    };

    $scope.callAlert = function(msg, type) {

        $scope.alert_msg = msg;
        $scope.alert_type = type;
        $scope.show_alert_login = true;

    };

});
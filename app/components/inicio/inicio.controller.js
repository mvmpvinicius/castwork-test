var castwork = angular.module('castwork');
castwork.controller('inicioController', function($http, $scope, $rootScope, $filter, $location, $cookies) {

    // $rootScope.verificaLogin();

    $scope.acao = 'create';

    $scope.usuario = {};

    $scope.alert_msg = '';
    $scope.alert_type = '';

    $scope.lista_usuarios = [];
    $scope.filterUsuarios = '';

    $scope.config = {
        itemsPerPage: 5,
        maxPages: 5,
        fillLastPage: 'yes'
    };

    $scope.closeAlert = function() {

        $scope.show_alert_inicio = false;

    };

    $scope.createUsuario = function() {

        $scope.acao = 'create';

        var data = {};
        data._f = 'usuarios';
        data._p = {
            acao: $scope.acao,
            usuario: $scope.usuario
        };

        $http.post('ws/ajax.php', data).then(function successCallback(response) {

            $('.md-usuario').modal('hide');

            $scope.callAlert('Usuário cadastrado com sucesso!', 'success');

            $scope.usuario = {};

            $scope.getAll();

        }, function errorCallback(response) {

            // error

        });

    };

    $scope.readUsuario = function(id) {

        console.log(id);

        $scope.acao = 'read';

        $('.md-usuario').modal('show');

        var data = {};
        data._f = 'usuarios';
        data._p = {
            acao: $scope.acao,
            id: id
        };

        $http.post('ws/ajax.php', data).then(function successCallback(response) {

            $scope.usuario = response.data[0];

            $scope.acao = 'update';

        }, function errorCallback(response) {

            // error

        });

    };

    $scope.updateUsuario = function() {

        $scope.acao = 'update';

        var data = {};
        data._f = 'usuarios';
        data._p = {
            acao: $scope.acao,
            usuario: $scope.usuario
        };

        $http.post('ws/ajax.php', data).then(function successCallback(response) {

            $('.md-usuario').modal('hide');

            $scope.callAlert('Usuário atualizado com sucesso!', 'success');

            $scope.usuario = {};

            $scope.getAll();

            $scope.acao = 'create';

        }, function errorCallback(response) {

            // error

        });

    };

    $scope.deleteUsuario = function(id) {

        $scope.acao = 'delete';

        var data = {};
        data._f = 'usuarios';
        data._p = {
            acao: $scope.acao,
            id: id
        };

        $http.post('ws/ajax.php', data).then(function successCallback(response) {

            $scope.callAlert('Usuário excluido com sucesso!', 'success');

            $scope.getAll();

        }, function errorCallback(response) {

            // error

        });

    };

    $scope.getAll = function() {

        $scope.acao = 'getAll';

        var data = {};
        data._f = 'usuarios';
        data._p = {
            acao: $scope.acao
        };

        $http.post('ws/ajax.php', data).then(function successCallback(response) {

            $scope.lista_usuarios = response.data;

            $scope.filterUsuarios = $scope.lista_usuarios;

        }, function errorCallback(response) {

            // error

        });

    };

    $scope.updatePass = function () {


        $scope.acao = 'updatePass';

        var data = {};
        data._f = 'usuarios';
        data._p = {
            acao: $scope.acao,
            nova_senha: $scope.usuario.senha,
            id: $cookies.getObject('user_data').id
        };

        $http.post('ws/ajax.php', data).then(function successCallback(response) {

            $('.md-usuario-pass').modal('hide');

            $scope.callAlert('Senha alterada com sucesso!', 'success');

        }, function errorCallback(response) {

            // error

        });

    };

    $scope.logout = function () {

        $cookies.remove('user_data');
        $location.path('/login');

    };

    $scope.callAlert = function(msg, type) {

        $scope.alert_msg = msg;
        $scope.alert_type = type;
        $scope.show_alert_inicio = true;

    };

    $scope.updatefilterUsuarios = function() {
        $scope.filterUsuarios = $filter("filter")($scope.lista_usuarios, $scope.filtro);
    };

    $scope.getAll();

});
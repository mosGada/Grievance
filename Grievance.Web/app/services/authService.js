'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', function ($http, $q, localStorageService, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false,

    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: ""
    };
    //saves users created
    var _saveRegistration = function (registration) {

        return $http.post(serviceBase + 'api/Account/Register', registration).then(function (response) {
           
            return response;
        });

    };

    var _getAccountById = function (account) {
        return $http.get(serviceBase + 'api/Account/GetAccountByID?id=' + account).then(function (response) {
            return response;
        });
    };


    var _updateRegistration = function (User) {
       
        return $http.post(serviceBase + 'api/Account/Update',User).then(function (response) {
            return response;
        });

    };

    var _getUsers = function () {
      
        return $http.get(serviceBase + 'api/Account/GetAll').then(function (response) {
            return response;
        });

    };

    var _saveRole = function (registration) {
        return $http.post(serviceBase + 'api/Role/register', registration).then(function (response) {
            return response;
        });
    };

    var _login = function (loginData) {
        
        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        if (loginData.useRefreshTokens) {
            data = data + "&client_id=" + ngAuthSettings.clientId + "&client_secret=" + ngAuthSettings.clientSecret;
        }

        var deferred = $q.defer();

        $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function (response) {
                
                if (loginData.useRefreshTokens) {
                  
                    localStorageService.set('authorizationData', { token: response.data.access_token, userName: response.data.userName, refreshToken: response.data.refresh_token, useRefreshTokens: true, userRole: response.data.userRole, userCompany: response.data.userCompany });
                    }
                    else {
                    localStorageService.set('authorizationData', { token: response.data.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false, userRole: response.data.userRole, userCompany: response.data.userCompany });
                    }
                    _authentication.isAuth = true;
                    _authentication.userName = response.data.userName;
                    _authentication.useRefreshTokens = loginData.useRefreshTokens;
                    _authentication.userRole = response.data.userRole;
                    _authentication.userCompany = response.data.userCompany;

                    deferred.resolve(response);
            }, function (err) {
                    _logOut();
                    deferred.reject(err);
            });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.useRefreshTokens = false;
        _authentication.userRole = "";
        _authentication.userCompany = "";


    };
    var _remeberMe = function (name, values) {
        var cookie = name + '=';
        cookie += values + ';';
        var date = new Date();
        date.setDate(date.getDate() + 365);
        cookie += 'expires=' + date.toString() + ';';
        document.cookie = cookie;

    }

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
            _authentication.useRefreshTokens = authData.useRefreshTokens;
            _authentication.userRole = authData.userRole;
            _authentication.userCompany = authData.userCompany;
        }

    };

    var _refreshToken = function () {
        var deferred = $q.defer();

        var authData = localStorageService.get('authorizationData');

        if (authData) {

            if (authData.useRefreshTokens) {

                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                localStorageService.remove('authorizationData');

                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    localStorageService.set('authorizationData', { token: response.data.access_token, userName: response.data.userName, refreshToken: response.data.refresh_token, useRefreshTokens: true, userRole: response.data.userRole, userCompany: response.data.userCompany });

                    deferred.resolve(response);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });
            }
        }

        return deferred.promise;
    };

    var _obtainAccessToken = function (externalData) {

        var deferred = $q.defer();

        $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.data.access_token, userName: response.data.userName, refreshToken: "", useRefreshTokens: false, userRole: response.data.userRole, userCompany: response.data.userCompany });

            _authentication.isAuth = true;
            _authentication.userName = response.data.userName;
            _authentication.useRefreshTokens = false;
            _authentication.userRole = response.data.userRole;
            _authentication.userCompany = response.data.userCompany;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _registerExternal = function (registerExternalData) {

        var deferred = $q.defer();

        $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

            localStorageService.set('authorizationData', { token: response.data.access_token, userName: response.data.userName, refreshToken: "", useRefreshTokens: false, userRole: response.data.userRole, userCompany: response.data.userCompany });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;
            _authentication.userRole = response.data.userRole;
            _authentication.userCompany = response.data.userCompany;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    //mehtod call to save the user
    authServiceFactory.saveRegistration = _saveRegistration;
    ///method call to update the user 
    authServiceFactory.updateuser = _updateRegistration;
    
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.rememberMe = _remeberMe;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.refreshToken = _refreshToken;
    authServiceFactory.saveRole = _saveRole; 
    authServiceFactory.getUsers = _getUsers
    authServiceFactory.getAccountById = _getAccountById

    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _externalAuthData;
    authServiceFactory.registerExternal = _registerExternal;

    return authServiceFactory;
}]);
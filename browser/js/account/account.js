app.config(function ($stateProvider) {

    $stateProvider.state('account', {
        url: '/account',
        templateUrl: 'js/account/account.html',
        controller: function ($scope, Account, $log) {
            Account.getAccountInfo().then(function (userAccount) {
                $scope.account = userAccount;
            })
            .catch($log);

            $scope.updateSettings = function(){
                $scope.updatePaySettings = !$scope.updatePaySettings;
            }

            $scope.showSettings = function(){
                $scope.showPaySettings = !$scope.showPaySettings
            }

            $scope.updatePaySettings = false;

            $scope.showPaySettings = false;

            $scope.updateInfo = function () {
                Account.updateInfo($scope.account);
            }
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
    });

});

app.factory('Account', function ($http) {

    var getAccountInfo = function () {
        return $http.get('/api/account').then(function (Account) {
            return Account.data;
        });
    };

    var updateInfo = function(accountObj){
        return $http.put('/api/account', accountObj).then(function(Account){
            console.log("Updating account info!");
            return Account.data;
        })
    }

    return {
        getAccountInfo: getAccountInfo,
        updateInfo: updateInfo
    };

});

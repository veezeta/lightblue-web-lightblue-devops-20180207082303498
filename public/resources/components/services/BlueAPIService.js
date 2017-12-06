app.service('BlueAPIService',['$http', 'CONFIG', function($http, CONFIG) {
    var invokeService = function(restUrl,
                requestType, parameters, successCallback,
                errorCallback) {
console.log("Blue API");
        if (requestType == 'GET') {
            $http({
                method: 'GET',
                url: restUrl
            }).then(successCallback, errorCallback);
        }
    }
    return  {
        getCatalog : function(successCallback, errorCallback) {
            var restUrl = 'catalog/';
            var requestType = 'GET';
            invokeService(restUrl, requestType, null, successCallback, errorCallback);
        },
        getItemById : function(itemId, successCallback, errorCallback) {
            var restUrl = 'catalog/' + itemId;
            var requestType = 'GET';
            invokeService(restUrl, requestType, null, successCallback, errorCallback);
        },
        getCustomerProfile : function(successCallback, errorCallback) {
            var restUrl = 'customer/';
            var requestType = 'GET';
            invokeService(restUrl, requestType, null, successCallback, errorCallback);
        }
    }
}]);

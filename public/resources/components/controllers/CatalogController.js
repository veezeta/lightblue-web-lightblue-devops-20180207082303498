app.controller('CatalogController', ['$scope','BlueAPIService',function($scope, BlueAPIService) {
    console.log("Entering Catalog Controller")
    BlueAPIService.getCatalog(function (response) {
        console.log("Get Inventory Result: " +  response);
        $scope.itemList = response.data
    }, function (error){
        console.log("Get Inventory Error: " + error);
    });
}]);

app.controller('ItemController', ['$scope','$routeParams','BlueAPIService',function($scope, $routeParams, BlueAPIService) {
    console.log("Entering Item Controller")
    BlueAPIService.getItemById($routeParams.id, function (response) {
        console.log("Get Item Detail Result: " + response);
        $scope.item = response.data
    }, function (error){
        console.log("Get Item Detail Error: " + error);
    });
}]);

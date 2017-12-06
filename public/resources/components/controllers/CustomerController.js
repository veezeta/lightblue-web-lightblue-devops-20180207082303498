app.controller('CustomerController', ['$scope','BlueAPIService',function($scope, BlueAPIService) {
    console.log("Entering Customer Controller")
    BlueAPIService.getCustomerProfile(function (response) {
        console.log("Get Customer Profile Response",response);
        $scope.customerInfo = response.data[0]
    }, function (error){
        console.log("Get Customer Profile Error: " + error);
    });
}]);

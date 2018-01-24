angular.module('advertisement', [])
.controller('SelleradvertiseCtrl', function($scope,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {

  $scope.imgurl=imageUrl;

  $http.get(baseUrl+'seller/share/2',+$rootScope.customerDetails.id,{
      headers: { "Authorization": 'Bearer '+$rootScope.authCode }
      }).then(function(response){
      	$scope.productadvertise=response.data[0].products;
      	console.log($scope.productadvertise)
      })

    $scope.advertise=function(list){
       $rootScope.advertiselist=list;
       $state.go('app.selleradvertisedetails');
    }
})
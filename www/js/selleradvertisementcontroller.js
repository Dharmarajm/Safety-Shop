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
    
    if($rootScope.advertiselist!=null){
      if($scope.advertiselist.stock_status==true){
       $scope.advertiselist.stock_status="In Stock";
      }
      if($scope.advertiselist.stock_status==false){
       $scope.advertiselist.stock_status="Out of Stack";
      }
      if($scope.advertiselist.display_status==1){
         $scope.advertiselist.display_status="Enabled";
      }
      if($scope.advertiselist.display_status==2){
        $scope.advertiselist.display_status=="Disabled";
      }  
    }
    
})
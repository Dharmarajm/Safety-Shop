angular.module('sellerproductdetail', [])
.controller('sellerproductdetailCtrl', function($scope,$rootScope,$window,$stateParams, $ionicModal,$ionicHistory,$timeout,$ionicPopup,$http,$state,$ionicLoading) {


$rootScope.customerDetails=JSON.parse(localStorage.getItem("sscustomer"));
$rootScope.authCode=localStorage.getItem("ssauthcode");

 $scope.sellproductname=$stateParams.selldetailid.name;
 
 $scope.stockState=function(id,state){
  console.log(id,state)
  var data={"product_id":id,"status":state};
  
  $http.post(baseUrl+'seller/product/stockstatus',data,{
      headers: { "Authorization": 'Bearer '+$rootScope.authCode }
      }).then(function(response){                     
      $scope.stockStateres=response.data;
      console.log($scope.stockStateres.msg);
      return $scope.isChecked(id,state);                
  })      
 }

 $scope.displayState=function(id,state){
  console.log(id,state)
  if(state==true){
    $scope.displayStateC=1;
  }

  if(state==false){
    $scope.displayStateC=2
  }

  console.log($scope.displayStateC)
  var data={"product_id":id,"status": $scope.displayStateC}
  $http.post(baseUrl+'seller/product/status',data,{
      headers: { "Authorization": 'Bearer '+$rootScope.authCode }
      }).then(function(response){                   
     $scope.displayStateres=response.data;
     return $scope.isChecked(id,state);                
  })     
 }

  $scope.isChecked = function(id, matches) {
     console.log(id,matches)
     var isChecked = id; 
     if(matches == true || matches == 1) {
        isChecked = true;
     }
      if(matches == false || matches == 2) {
       isChecked= false;
     }
    return isChecked;
  }

  $scope.prodEdit=function(id){
    localStorage.setItem("editId",JSON.stringify(id));
    $state.go('app.sellerproductadd');
  }

})
angular.module('sellerproduct', [])
.controller('sellerproductCtrl', function($scope,$rootScope,$window,$stateParams, $ionicModal,$ionicHistory,$timeout,$ionicPopup,$http,$state,$ionicLoading) {
$rootScope.customerDetails=JSON.parse(localStorage.getItem("sscustomer"));
$rootScope.authCode=localStorage.getItem("ssauthcode");
$scope.imgurl=imageUrl;
 $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
                });
  $scope.sellerproduct=[];

  $scope.sellProductInit=function(){
    $http.get(baseUrl+'seller/product/'+$rootScope.customerDetails.id,{
      headers: { "Authorization": 'Bearer '+$rootScope.authCode }
      }).then(function(response)
      {                   
      $timeout(function () {
      $ionicLoading.hide();
      });
      
       for(var i in response.data[0].products){
         $scope.sellerproduct.push({"id":response.data[0].products[i].id ,"name":response.data[0].products[i].name,"image":response.data[0].products[i].image,"sku":response.data[0].products[i].sku,"stock_status":response.data[0].products[i].stock_status,"display_status":response.data[0].products[i].display_status,"status":false,"category":response.data[0].products[i].category,"price":response.data[0].products[i].price,"created_at":response.data[0].products[i].created_at});
         console.log($scope.sellerproduct)
       }          
      })      
  }
                

 $scope.sellerlist=function(sell){
      $rootScope.sellid=sell;
        var selldetailid={"id":sell.id,"name":sell.name}; 
        $state.go('app.sellerproductdetails',{selldetailid});  
 }
  
 /*$scope.sellproductname=$stateParams.selldetailid.name; */

 $scope.productdelval=function(id){
       console.log(id)
       if(id==undefined || id==""){
         alert("Please select the Product")
        return 
       }
       if(id!=null || id!=""){
          var myPopup = $ionicPopup.show({
         title: 'Are You sure want to delete the product',
         scope: $scope,
      
         buttons: [
            { text: 'Cancel' }, {
               text: 'OK',
               type: 'button-positive',
               onTap: function(e) {
            
                  return $scope.productdel(id);
                  }
               }
         ] 
        
       })
      }
     }             

 $scope.productdel=function(id){
    $http.post(baseUrl+'seller/product/delete',{product_id:id},{
                headers: { "Authorization": 'Bearer '+$rootScope.authCode }
                }).then(function(response){
                   $scope.sellerproduct=response.data; 
                   $rootScope.product_id='';
                   $scope.sellProductInit()
                })
 }
 
 $scope.selllistCheck=function(id,check){
   $rootScope.arr=[];
   for(var i=0;i<$scope.sellerproduct.length;i++){
     $scope.checkloop=$scope.sellerproduct[i];
     $rootScope.arr.push($scope.sellerproduct[i].status);
     if($scope.sellerproduct[i].status==true){       
       $rootScope.Checktic=true;
       $rootScope.product_id=id;   
     }
     
   } 
    $scope.result = [];
    for(var x = 0; x < $rootScope.arr.length; x++){
     if($scope.result.indexOf($rootScope.arr[x]) == -1)
        $scope.result.push($rootScope.arr[x]);
     }
     if($scope.result.length == 1 && $scope.result[0] == false){
      $rootScope.Checktic = false; 
      $rootScope.product_id=null;
    }
 }

})
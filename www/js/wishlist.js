angular.module('wishlist', [])
.controller('WishlistCtrl', function($scope,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {





$scope.wishinit=function(){


   $http.get(baseUrl+'ipwishlist/items',{
    headers: { "Authorization": 'Bearer '+$rootScope.authCode }
  }).then(function(response)
  {                   
  $scope.wishstatus="";
   console.log(response);
  $scope.getWishlist=response.data;
   }, function(data, status, headers, config) {
    console.log(data.status, status, headers, config);
    if(data.status==401){
    	//alert("please Login")
    	$scope.wishstatus="please login";
    }
})
   

}
                        /*  var login=
                          {
                            
                          }
                          $http
                          ({
                            method: 'post',
                            url: baseUrl+'ipwishlist/add/',
                            headers: { "Authorization": 'Bearer '+$rootScope.authCode },
                            data: login  
                          })
                          .success(function(data) {
                            console.log(data);
                            
                             }).error(function(data, status, headers, config){
                           console.log(data.message);
                          
                           });
*/

     $scope.wishRemove=function(wishdel){
     	$http({
    method: 'DELETE',
    url: baseUrl+'ipwishlist/delete/' + wishdel.wishlist_item_id,
    data: {},
    headers: { "Authorization": 'Bearer '+$rootScope.authCode      
    }
})
.then(function(response) {
    console.log(response);
     $scope.wishinit();
     //$apply(); 
}, function(data, status, headers, config) {
    console.log(data, status, headers, config);
});
     }

})
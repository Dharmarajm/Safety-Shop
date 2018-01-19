angular.module('cart', [])
.controller('CartCtrl', function($scope,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {


                      $http.get(baseUrl+'carts/mine/items/',{
                          headers: { "Authorization": 'Bearer '+$rootScope.authCode }
                           }).then(function(response)
                        { 
                          console.log(response);
                          $scope.carditemlist=response.data;
                          $http.get(baseUrl+'product/'+response.data[0].sku,{
                          headers: { "Authorization": 'Bearer '+$rootScope.authCode }
                           }).then(function(response)
                        { 
                          console.log(response);
                         $scope.cardlist=response.data;
                      
                     }) 
                      
                     }) 
             $scope.cartRemove=function(ss){

             	console.log(ss);
			   $http({
			    method: 'DELETE',
			    url: baseUrl+'carts/mine/items/' +10,
			    data: {},
			    headers: { "Authorization": 'Bearer '+$rootScope.authCode      
			    }
			})
			.then(function(response) {
			    console.log(response);
			     
			}, function(data, status, headers, config) {
			    console.log(data, status, headers, config);
			});

             }
})


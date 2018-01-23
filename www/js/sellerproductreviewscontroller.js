angular.module('SellerProductreviews', [])
.controller('SellerProductreviewsCtrl', function($scope,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {

   $http.get(baseUrl+'seller/review/view/'+$rootScope.sellertablelist.id,+$rootScope.customerDetails.id,{
      headers: { "Authorization": 'Bearer '+$rootScope.authCode }
      }).then(function(response){
      	$scope.productsListReview=response.data[0];
      	console.log($scope.productsListReview)
      }) 	
   console.log($rootScope.sellertablelist) 

   $scope.reviewListPopup=function(list){
   	$scope.datalistreview=list;
   	$scope.modalproductdetail.show();		              
   }

   $ionicModal.fromTemplateUrl('reviewfulldatail.html', {
	scope: $scope,
	animation: 'slide-in-left'
	}).then(function(modalproductdetails) {
		
	$scope.modalproductdetail = modalproductdetails;
	});
   $scope.closeproductdetails = function() {
	  $scope.modalproductdetail.hide();
   }  
}); 
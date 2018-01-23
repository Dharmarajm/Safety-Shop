angular.module('review', ['ionic-ratings'])
.controller('sellerreviewsCtrl', function($scope,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {
 
 $scope.imgurl=imageUrl;

 $scope.getStars = function(rating) {
			    // Get the value
			    var val = parseFloat(rating);
			    // Turn value into number/100
			    var size = val/100*100;
			    return size + '%';
 }
			       
 $http.get(baseUrl+'seller/review/2',+$rootScope.customerDetails.id,{
      headers: { "Authorization": 'Bearer '+$rootScope.authCode }
      }).then(function(response){
      	$scope.productsReview=response.data[0].products;
      })

 $scope.reviewList=function(review){
 	$rootScope.reviewdata=review;
 	$state.go('app.sellerreviewlist')
 }  
 
 

 $scope.sellerproductre=function(review){
   $rootScope.sellertablelist=review;
   $state.go('app.sellerproductreviews');
 }
 
 $scope.productreviewStatus=function(){
    var data={
	           "seller_id": 2,
	           "product_id": 2,
	           "review_id": 6,
	           "status": 1
             }

   $http.post(baseUrl+'seller/review/status',data,{ headers: { "Authentication": 'Bearer '+$rootScope.authCode }
     }).then(function(res){
        $scope.reviewStatussuccess=res.data;
     })          
 }

})
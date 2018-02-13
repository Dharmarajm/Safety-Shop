angular.module('review', ['ionic-ratings'])
.controller('sellerreviewsCtrl', function($scope,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {
 
 $scope.imgurl=imageUrl;
 $rootScope.authCode=localStorage.getItem("ssauthcode");
 $rootScope.customerDetails=JSON.parse(localStorage.getItem("sscustomer"));

 $scope.getStars = function(rating) {
			    // Get the value
			    var val = parseFloat(rating);
			    // Turn value into number/100
			    var size = val/100*100;
			    return size + '%';
 }
 
 $scope.sellrevcode=function(){
   $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });

   $http.get(baseUrl+'seller/review/'+$rootScope.customerDetails.id,{
      headers: { "Authorization": 'Bearer '+$rootScope.authCode }
      }).then(function(response){
        $scope.productsReview=response.data[0].products;
        $timeout(function () {
          $ionicLoading.hide();
        }); 
      })   
 }		       
 

 $scope.reviewList=function(review){
 	$rootScope.reviewdata=review;
 	$state.go('app.sellerreviewlist')
 }  
 
 

 $scope.sellerproductre=function(review){
   $rootScope.sellertablelist=review;
   $state.go('app.sellerproductreviews');
 }
 
 /*$scope.productreviewStatus=function(){
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
 }*/

})
angular.module('Myreview', ['ionic-ratings'])

.controller('MyreviewCtrl', function($scope, $sce,$stateParams,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {
    
    $rootScope.customerDetails=JSON.parse(localStorage.getItem("sscustomer"));
    /*console.log($rootScope.customerDetails)*/
  	$http.get(baseUrl+'review/customer/reviews/'+$rootScope.customerDetails.id,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
      }).then(function(response){ 
         $rootScope.getMyReviews=response.data[0].reviews;
         console.log($rootScope.getMyReviews)
        })

    $scope.getStars = function(rating) {
     var val = parseFloat(rating);
     var size = val/5*100;
     return size + '%';
    }
    
    $scope.imgurl=imageUrl;
    
    $scope.myReviewdetails=function(data){
      $rootScope.getMyreviewall=data;
      $state.go('app.myproductreviewDetails')
    } 
})
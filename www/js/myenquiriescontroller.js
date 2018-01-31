angular.module('Myenquiries', ['ionic-ratings'])

.controller('MyenquiriesCtrl', function($scope, $sce,$stateParams,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {
 
  $rootScope.customerDetails=JSON.parse(localStorage.getItem("sscustomer"));

  $http.get(baseUrl+'customer/enquiry/'+$rootScope.customerDetails.id,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
      }).then(function(response){ 
         $rootScope.getMyenquiries=response.data;
         console.log($rootScope.getMyenquiries)
        })
  $scope.myEnquirydetails=function(data){
  	$rootScope.getmyenquiry=data;
  	$state.go('app.myenquirydetails');
  }    
})
angular.module('Myinbox', ['ionicLetterAvatarSelector'])

.controller('MyinboxCtrl', function($scope, $sce, $stateParams, $rootScope, $window, $ionicModal, $timeout, $ionicPopup, $http, $state, $ionicLoading, $ionicLetterAvatarSelector) {

  $rootScope.customerDetails = JSON.parse(localStorage.getItem("sscustomer"));

  $scope.cusinbox = function() {

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    $http.get(baseUrl + 'customer/enquiry/inbox/' + $rootScope.customerDetails.id, {
      headers: {
        "Authorization": 'Bearer ' + $rootScope.authCode
      }
    }).then(function(response) {
      $rootScope.getMyinbox = response.data;
      console.log($rootScope.getMyinbox)
      $timeout(function() {
        $ionicLoading.hide();
      });
    })
  }

  $scope.getStyle = function(id) {
    if (id.move_to == "Important") {
      return {
        'color': 'blue'
      };
    } else {
      return;
    }
  }

  $scope.inboxdetail = function(id) {
    $rootScope.getmyinboxId = id;
    $state.go("app.myinboxdetails");
  }

})
angular.module('sellerproductdetail', [])
  .controller('sellerproductdetailCtrl', function($scope, $rootScope, $window, $stateParams, $ionicModal, $ionicHistory, $timeout, $ionicPopup, $http, $state, $ionicLoading) {


    $rootScope.customerDetails = JSON.parse(localStorage.getItem("sscustomer"));
    $rootScope.authCode = localStorage.getItem("ssauthcode");

    $scope.sellproductname = $stateParams.selldetailid.name;
    console.log($scope.sellproductname)
    $scope.sellproductnameid=$stateParams.selldetailid.id
    console.log($scope.sellproductnameid) 
    if ($scope.sellid.display_status == '1') {
      $scope.sellid.test = true;
    } else if ($scope.sellid.display_status == '2') {
      $scope.sellid.test = false;
    }

    $scope.stockState = function(id, state) {
      var data = {
        "product_id": id,
        "status": state
      };
      console.log(data)
      $http.post(baseUrl + 'seller/product/stockstatus', data, {
        headers: {
          "Authorization": 'Bearer ' + $rootScope.authCode
        }
      }).then(function(response) {
        $scope.stockStateres = response.data;
        console.log($scope.stockStateres)
          /*return $scope.isChecked(id,state);*/
      })
    }

    $scope.displayState = function(id, state) {
      console.log($scope.sellid.test)
      if (state == true) {
        $scope.displayStateC = 1;
      }

      if (state == false) {
        $scope.displayStateC = 2;
      }

      var data = {
        "product_id": id,
        "status": $scope.displayStateC.toString()
      }
      console.log(data)
      $http.post(baseUrl + 'seller/product/status', data, {
        headers: {
          "Authorization": 'Bearer ' + $rootScope.authCode
        }
      }).then(function(response) {
        $scope.displayStateres = response.data;
        console.log($scope.displayStateres)
          /*return $scope.isChecked(id,state);                */
      })
    }

    /*$scope.isChecked = function(id, matches) {
       var isChecked = id; 
       if(matches == true || matches == 1) {
          isChecked = true;
       }
        if(matches == false || matches == 2) {
         isChecked= false;
       }
      return isChecked;
    }*/

    $scope.prodEdit = function(id) {
      localStorage.setItem("editId", JSON.stringify(id));
      $state.go('app.sellerproductadd');
    }

  })
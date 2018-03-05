angular.module('home', [])
  .controller('HomeCtrl', function($scope, $rootScope, $window, $ionicModal, $timeout, $ionicPopup, $http, $state, $ionicLoading, $ionicSlideBoxDelegate) {

    $scope.submitted = false;

    $rootScope.customerDetails = JSON.parse(localStorage.getItem("sscustomer"));
    $rootScope.authCode = localStorage.getItem("ssauthcode");
    $scope.dashboardinit = function() {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      $http.get(baseUrl + 'dashboard', {
        headers: {
          "Authorization": 'Bearer ' + $rootScope.authCode
        }
      }).then(function(response) {
        // console.log(response);
        $scope.homevalue = response.data;
        console.log($scope.homevalue)
        console.log($scope.homevalue[0].brand_list[2].image)
        $scope.newarrive = [];
        $scope.newarrstatus = 0;
        for (var i in $scope.homevalue[0].new_arrivals) {

          if (i <= 3) {
            $scope.newarrive.push($scope.homevalue[0].new_arrivals[i])
          }
        }

        $timeout(function() {
          $ionicLoading.hide();
        });

      })
    }

    $scope.newarrivemore = function() {
      $scope.newarrive = [];
      $scope.newarrstatus = 1;
      for (var i in $scope.homevalue[0].new_arrivals) {
        $scope.newarrive.push($scope.homevalue[0].new_arrivals[i])
      }
    }


    /* $scope.searchBtn=function(val){
    $rootScope.searchStatus=1;
    $rootScope.searchDetail=val;
    // $state.go('app.product')
    }


    if($rootScope.searchStatus==1)
    {
    //alert()
    $scope.filterUser=$rootScope.searchDetail;
    //$scope.$apply();
    //alert($scope.filterUser);
    $http.get(baseUrl+'products/?searchCriteria[filter_groups][0][filters][0][field]=name&searchCriteria[filter_groups][0][filters][0][value]=%'+$scope.filterUser+'%&searchCriteria[filter_groups][0][filters][0][condition_type]=like&searchCriteria[sortOrders][0][field]=name&searchCriteria[sortOrders][0][direction]=asc&searchCriteria[pageSize]=10&searchCriteria[currentPage]=1',{
    headers: { "Authorization": 'Bearer '+$rootScope.authCode }
    }).then(function(response)
    {                   

    console.log(response);
    $timeout(function () {
    $ionicLoading.hide();
    // $state.go('app.product')
    $rootScope.searchStatus=0;
    })
    $rootScope.ProductList= response.data.items;  
    })


    }                       */
    $scope.serachgo = function() {

      $state.go('app.search', {
        reload: true
      });
    }


    $scope.productdetails = function(id, name) {

      var prodetail = {
        'id': id,
        'name': name
      }
      console.log(prodetail)
      $state.go('app.productdetails', {
        prodetail
      })


    }



    $scope.catagory = function(val) {
      if (val.id == 2) {
        $state.go('app.category');
      } else {
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
        $http.get(baseUrl + 'products/?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=' + val.id + '&searchCriteria[filter_groups][0][filters][0][condition_type]=eq&searchCriteria[page_size]=10&searchCriteria[current_page]=1', {
          headers: {
            "Authorization": 'Bearer ' + $rootScope.authCode
          }
        }).then(function(response) {
          $rootScope.subid1 = val.id;
          $rootScope.subname = val.name
            // console.log(response);
          $timeout(function() {
            $ionicLoading.hide();
            $state.go('app.product')
          })
          $rootScope.ProductList = [];
          $rootScope.size = 1;
          $rootScope.totalcount = response.data.total_count;

          $rootScope.ProductList.push(response.data.items);
          console.log($rootScope.ProductList)
        })
      }

    }
    $scope.interval = 2000;

    $scope.slideHasChanged = function(index) {
      $scope.slideIndex = index;
      if (($ionicSlideBoxDelegate.count() - 1) == index) {
        $timeout(function() {
          $ionicSlideBoxDelegate.slide(0);
          $ionicSlideBoxDelegate.update(); 
        }, $scope.interval);
      }
    };

    /*$scope.$on('$ionicView.enter', function(){
      $scope.slideHasChanged();
    });

    $scope.$on('$ionicView.leave', function(){
     $scope.slideBox.stop();
    });*/




  }).directive('dynamicSlides', function() {
    return {
        require: ['^ionSlideBox'],
        link: function(scope, elem, attrs, slider) {
            scope.$watch(function() {
                return scope.$eval(attrs.dynamicSlides).length;
            }, function(val) {
                console.log(slider[0].__slider.update())
                slider[0].__slider.update();
            });
        }
    };
});
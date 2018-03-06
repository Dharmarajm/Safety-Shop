angular.module('category', [])

.controller('CategoryCtrl', function($scope, $stateParams, $rootScope, $window, $ionicModal, $timeout, $ionicPopup, $http, $state, $ionicLoading) {

  $scope.imgurl = imageUrl;
  $scope.getclasscateg=1;
  $scope.categoryinit = function() {

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    $http.get(baseUrl + 'categories/?root_category_id=2&depth=1', {
      headers: {
        "Authorization": 'Bearer ' + $rootScope.authCode
      }
    }).then(function onSuccess(response) {
      // console.log(response);
      $scope.resvalue = response.data.children_data;
      $timeout(function() {
        $ionicLoading.hide();
      }); 
    })

  }

  $scope.statusColapse = 1;
  
  $scope.mainCategory = function(id) {


    if ($scope.statusColapse == id) {

      $scope.IsVisible = $scope.IsVisible ? false : true;

      return;
    } else {
      $scope.IsVisible = true;
    }

    $scope.statusColapse = id;
    $scope.subid = id;



    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    //$scope.IsVisible = false;
    $http.get(baseUrl + 'categories/?root_category_id=' + id + '&depth=2', {
      headers: {
        "Authorization": 'Bearer ' + $rootScope.authCode
      }
    }).then(function onSuccess(response) {
      $timeout(function() {
        $ionicLoading.hide();
      });
      // $scope.IsVisible = true;

      // console.log(response);
      $scope.resvalue1 = response.data.children_data;

    })

  }

  $rootScope.subCategory = function(subcat) {



    // $rootScope.ProductList=[];
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    $rootScope.subname = subcat.name;
    //$scope.modalproducts.show();
    // console.log(subcat.children_data);

    if (subcat.children_data.length > 0) {
      $rootScope.subcatdisplay = subcat.children_data;
      // console.log( $scope.subcatdisplay)
      $timeout(function() {
        $ionicLoading.hide();
      });
      $state.go('app.subcategory')
    } else {


      $http.get(baseUrl + 'products/?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=' + subcat.id + '&searchCriteria[filter_groups][0][filters][0][condition_type]=eq&searchCriteria[page_size]=10&searchCriteria[current_page]=1', {
        headers: {
          "Authorization": 'Bearer ' + $rootScope.authCode
        }
      }).then(function onSuccess(response) {
        $rootScope.subid1 = subcat.id;
        // console.log(response);
        $timeout(function() {
          $ionicLoading.hide();
          $state.go('app.product')
        })
        $rootScope.size = 1;
        $rootScope.totalcount = response.data.total_count;
        $rootScope.ProductList = [];
        $rootScope.ProductList.push(response.data.items);
        console.log($rootScope.ProductList)
      })
    }

  }

  /*   $ionicModal.fromTemplateUrl('productdetails.html', {
              scope: $scope,
              animation: 'slide-in-left'
              }).then(function(modalproductdetails) {
              $scope.modalproductdetails = modalproductdetails;
              });

              $scope.closeproductdetails = function() {
               $scope.modalproductdetails.hide();
              };
*/



  $scope.productdetails = function(id, name) {

    var prodetail = {
      'id': id,
      'name': name
    }
    $state.go('app.productdetails', {
      prodetail
    })


  }

  $rootScope.loadshow = false;
  $scope.loadMore = function() {

    $rootScope.size++;
    if ($rootScope.totalcount >= $rootScope.size * 10) {

      $http.get(baseUrl + 'products/?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=' + $rootScope.subid1 + '&searchCriteria[filter_groups][0][filters][0][condition_type]=eq&searchCriteria[page_size]=10&searchCriteria[current_page]=' + $rootScope.size, {
        headers: {
          "Authorization": 'Bearer ' + $rootScope.authCode
        }
      }).then(function onSuccess(response) {


        $timeout(function() {
          $ionicLoading.hide();

          //$state.go('app.product')

        })
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $rootScope.ProductList.push(response.data.items);
      })
    } else {
      $rootScope.loadshow = true;
    }
  }

})




/* $scope.wishAdd=function(wishres){

console.log(wishres);

$http
({
method: 'post',
url: baseUrl+'ipwishlist/add/'+wishres.id,
headers: { "Authorization": 'Bearer '+$rootScope.authCode },
data:{}
})
.success(function(data) {
console.log(data,"success");

}).error(function(data, status, headers, config){
console.log(data,status);
if(status==401){
alert("please login");
}

});
}

$scope.cartAdd=function(prod,qty){
console.log(prod);
$http
({
method: 'post',
url: baseUrl+'carts/mine/',
headers: { "Authorization": 'Bearer '+$rootScope.authCode },
data:{}
})
.success(function(data) {
console.log(data,"success");
var cartpost={
"cartItem": {
"sku": prod.sku,
"qty": qty,
"quote_id": data
}
}
$http
({
method: 'post',
url: baseUrl+'carts/mine/items',
headers: { "Authorization": 'Bearer '+$rootScope.authCode },
data:cartpost
})
.success(function(data) {
console.log(data,"success");
}).error(function(data, status, headers, config){
console.log(data,status);

})


}).error(function(data, status, headers, config){
console.log(data,status);
if(status==401){
alert("please login");
}
})


}*/
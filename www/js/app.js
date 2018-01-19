// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers','address','login','home','wishlist','search','category','cart','productdetail','sellerproduct','sellerproductdetail','sellerproductadd','ngCordova','enquiry'])

.run(function($ionicPlatform,$ionicPopup,$rootScope,$state,$ionicHistory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $ionicPlatform.registerBackButtonAction(function (event) {
  if($state.current.name=="app.home"){
    var myPopup = $ionicPopup.show({
    title: 'Safety Shop',
    template:'<center>Are you sure want to exit</center>',
    buttons: [
   {
    text: 'Cancel',
    onTap: function(e) { 
      
    } 
   },
   {
    text: 'Ok',
    type: 'button-calm',
    onTap: function(e) { 
      navigator.app.exitApp();
    }
   }]
  }); //<-- remove this line to disable the exit
  }
  else {
    navigator.app.backHistory();
  }
}, 100);

  $rootScope.myGoBack = function() {
       $ionicHistory.goBack();
 };
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html'
      }
    }
  })

  .state('app.sellerlogin', {
    url: '/sellerlogin',
    views: {
      'menuContent': {
        templateUrl: 'templates/sellerlogin.html',
        controller:'LoginCtrl'
      }
    }
  }) 

  .state('app.sellerproduct', {
    url: '/sellerproduct',

    views: {
      'menuContent': {
        templateUrl: 'templates/sellerproductlist.html',
        controller:'sellerproductCtrl'
      }
    }
  }) 

  .state('app.sellerproductdetails', {
    url: '/sellerproductdetails',
     params: { selldetailid: null },
    views: {
      'menuContent': {
        templateUrl: 'templates/sellerproductdetails.html',
        controller:'sellerproductdetailCtrl'
      }
    }
  })   

  .state('app.sellerproductadd', {
    url: '/sellerproductadd',
    views: {
      'menuContent': {
        templateUrl: 'templates/sellerproductadd.html',
        controller:'sellerproductaddCtrl'
      }
    }
  })     

  .state('app.category', {
    url: '/category',
    views: {
      'menuContent': {
        templateUrl: 'templates/category.html',
        controller: 'CategoryCtrl'
      }
    }
  })

  .state('app.order', {
      url: '/order',
      views: {
        'menuContent': {
          templateUrl: 'templates/order.html'
        }
      }
    })

  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

  .state('app.wishlist', {
      url: '/wishlist',
      views: {
        'menuContent': {
          templateUrl: 'templates/wishlist.html',
          controller: 'WishlistCtrl'
        }
      }
    })

  .state('app.cart', {
      url: '/cart',
      views: {
        'menuContent': {
          templateUrl: 'templates/addcart.html',
          controller: 'CartCtrl'
        }
      }
    })

  .state('app.subcategory', {
    url: '/subcategory',
    views: {
      'menuContent': {
        templateUrl: 'templates/subcategory.html'
       
      }
    }
  })

  .state('app.product', {
    url: '/product',
    views: {
      'menuContent': {
        templateUrl: 'templates/product.html',
         controller: 'CategoryCtrl'
         
       
      }
    }
  })

  .state('app.productdetails', {
    url: '/productdetails',
    params: { prodetail: null },
    views: {
      'menuContent': {
        templateUrl: 'templates/productdetails.html',
         controller: 'ProductDetailCtrl'
       
      }
    }
  })

  .state('app.enquirydetails', {
    url: '/enquirydetails',
    views: {
      'menuContent': {
        templateUrl: 'templates/enquirydetails.html',
         controller: 'EnquiryCtrl'
       
      }
    }
  })

  .state('app.emaildetails', {
    url: '/emaildetails',
    views: {
      'menuContent': {
        templateUrl: 'templates/emaildetails.html',
         controller: 'EnquiryCtrl'
       
      }
    }
  })

  .state('app.address', {
    url: '/address',
    views: {
      'menuContent': {
        templateUrl: 'templates/address.html',
        controller: 'AddressCtrl'
      }
    }
  })

  .state('app.search', {
    url: '/search',

    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller:'SearchCtrl'
      }
    }
  })
  
  .state('app.searchresult', {
    url: '/searchresult',
    views: {
      'menuContent': {
        templateUrl: 'templates/searchresult.html',
         controller:'SearchCtrl'
      }
    }
  })    

  .state('app.single', {
    url: '/home/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})


//var baseUrl='http://tools.yantra24x7.com/sample/index.php/rest/V1/';

var baseUrl='http://safetyshop.in/home/index.php/rest/V1/';
var imageUrl='http://safetyshop.in/home/pub/media/catalog/product';
var solrUrl='http://45.32.125.151:3030/';
//var baseUrl='http://192.168.1.173/safetyshop/index.php/rest/V1/';
//var imageUrl='http://192.168.1.173/safetyshop/pub/media/catalog/product';



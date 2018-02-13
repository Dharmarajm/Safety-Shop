// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers','address','login','home','wishlist','search','category','cart','productdetail','sellerprod','sellerproductdetail','sellerproductadd','ngCordova','enquiry','review','advertisement','SellerProductreviews','Myreview','Myenquiries','Myinbox','sellerDashboard','chart.js'])

.run(function($ionicPlatform,$ionicPopup,$rootScope,$state,$ionicHistory,$ionicSlideBoxDelegate,$timeout,$ionicLoading) {
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

    var permissions = cordova.plugins.permissions;
     permissions.requestPermission(permissions.CAMERA, success, error);
    
   function error() {
     console.warn('Camera permission is not turned on');
   }
    
   function success( status ) {
     if( !status.hasPermission ) error();
   }
   permissions.hasPermission(permissions.CAMERA, function( status ){
    if ( status.hasPermission ) {
     console.log("Yes :D ");
    }
    else {
     console.warn("No :( ");
    }
   });

   document.addEventListener("offline", onOffline, false);

     function onOffline() {
       $timeout(function () {
         $ionicLoading.hide();
       });
       $rootScope.netStatus=0;
        // Handle the offline event
        alert('you are offline');
     }
     document.addEventListener("online", isOnline, false);
      function isOnline() {
       $rootScope.netStatus=1;
       if($state.current.name=='app.home' || $state.current.name=='app.category' || $state.current.name=='app.sellerdashboard' || $state.current.name=='app.sellerproduct' || $state.current.name=='app.enquirydetails' || $state.current.name=='app.sellerreviews' || $state.current.name=='app.selleradvertisement' || $state.current.name=='app.myproductreviews' || $state.current.name=='app.myenquiries' || $state.current.name=='app.myinbox' || $state.current.name=='app.address'){
         $state.reload();
       }
        // Handle the offline event
        alert('you are online');
        console.log($rootScope.netStatus)
     }
  });
  
  
  /*$rootScope.interval = 2000;
       
       $rootScope.slideHasChanged = function(index) {
           $rootScope.slideIndex = index;
           if ( ($ionicSlideBoxDelegate.count() -1 ) == index ) {
               $timeout(function(){
                   $ionicSlideBoxDelegate.slide(0);
               },$rootScope.interval);
           }
       };*/
   

   /*$ionicPlatform.registerBackButtonAction(function (event) {
       e.preventDefault();
              function showConfirm() {
                 var myPopup = $ionicPopup.show({
                 title: 'Safety Shop',
                 template:'<center>Are you sure want to exit</center>',
                 buttons: [{
                           text: 'Cancel',
                           type : 'button-positive',
                           onTap: function(e) { 
                             
                           } 
                          },
                          {
                           text: 'Ok',
                           type : 'button-dark',
                           onTap: function(e) { 
                             ionic.Platform.exitApp();
                           }
                          }]
                });
              };

              if($state.current.name=='app.home' || $state.current.name=='app.enquirydetails' || $state.current.name=='app.category' || $state.current.name=='app.sellerproductadd' || $state.current.name=='app.sellerproduct' || $state.current.name=='app.enquirydetails' || $state.current.name=='app.sellerreviews' || $state.current.name=='app.selleradvertisement'){
                showConfirm();
              }else {
                $ionicHistory.goBack();
              }
            }, 100);
*/
     
  $ionicPlatform.registerBackButtonAction(function(e) {
   e.preventDefault();
   function showConfirm() {
    var confirmPopup = $ionicPopup.show({
     title: 'Safety Shop',
                 template:'<center>Are you sure want to exit</center>',
                 buttons: [{
                           text: 'Cancel',
                           type : 'button-positive',
                           onTap: function(e) { 
                             
                           } 
                          },
                          {
                           text: 'Ok',
                           type : 'button-dark',
                           onTap: function(e) { 
                             ionic.Platform.exitApp();
                           }
                         }]
    });
   };
   if($state.current.name=='app.sellerproductadd' && $rootScope.selldata=='Edit'){
      $ionicHistory.goBack();
   }else if($state.current.name=='app.home' || $state.current.name=='app.category' || $state.current.name=='app.sellerdashboard' || $state.current.name=='app.sellerproductadd' || $state.current.name=='app.sellerproduct' || $state.current.name=='app.enquirydetails' || $state.current.name=='app.sellerreviews' || $state.current.name=='app.selleradvertisement' || $state.current.name=='app.myproductreviews' || $state.current.name=='app.myenquiries' || $state.current.name=='app.myinbox' || $state.current.name=='app.address'){
      showConfirm();
   }else{
     $ionicHistory.goBack();
   } 
   return false;
  }, 101);
 
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

  .state('app.sellerdashboard', {
    url: '/sellerdashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/sellerdashboard.html',
         controller:'sellerdashboardCtrl'
      }
    }
  })  

  .state('app.sellerreviews', {
    url: '/sellerreviews',
    views: {
      'menuContent': {
        templateUrl: 'templates/sellerreviews.html',
         controller:'sellerreviewsCtrl'
      }
    }
  })

  .state('app.sellerreviewlist', {
    url: '/sellerreviewlist',
    views: {
      'menuContent': {
        templateUrl: 'templates/sellerreviewlist.html',
         controller:'sellerreviewsCtrl'
      }
    }
  })

  .state('app.sellerproductreviews', {
    url: '/sellerproductreviews',
    views: {
      'menuContent': {
        templateUrl: 'templates/sellerproductreviews.html',
         controller:'SellerProductreviewsCtrl'
      }
    }
  })

  .state('app.selleradvertisement', {
    url: '/selleradvertisement',
    views: {
      'menuContent': {
        templateUrl: 'templates/selleradvertisement.html',
         controller:'SelleradvertiseCtrl'
      }
    }
  })

  .state('app.selleradvertisedetails', {
    url: '/selleradvertisedetails',
    views: {
      'menuContent': {
        templateUrl: 'templates/selleradvertisedetails.html',
         controller:'SelleradvertiseCtrl'
      }
    }
  })

  .state('app.myproductreviews', {
    url: '/myproductreviews',
    views: {
      'menuContent': {
        templateUrl: 'templates/myproductreviews.html',
         controller:'MyreviewCtrl'
      }
    }
  })

  .state('app.myproductreviewDetails', {
    url: '/myproductreviewDetails',
    views: {
      'menuContent': {
        templateUrl: 'templates/myproductreviewDetails.html',
         controller:'MyreviewCtrl'
      }
    }
  })    

  .state('app.myenquiries', {
    url: '/myenquiries',
    views: {
      'menuContent': {
        templateUrl: 'templates/myenquiries.html',
         controller:'MyenquiriesCtrl'
      }
    }
  })

  .state('app.myenquirydetails', {
    url: '/myenquirydetails',
    views: {
      'menuContent': {
        templateUrl: 'templates/myenquirydetails.html',
         controller:'MyenquiriesCtrl'
      }
    }
  })

  .state('app.myinbox', {
    url: '/myinbox',
    views: {
      'menuContent': {
        templateUrl: 'templates/myinbox.html',
         controller:'MyinboxCtrl'
      }
    }
  })

  .state('app.myinboxdetails', {
    url: '/myinboxdetails',
    views: {
      'menuContent': {
        templateUrl: 'templates/myinboxdetails.html',
         controller:'MyinboxCtrl'
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



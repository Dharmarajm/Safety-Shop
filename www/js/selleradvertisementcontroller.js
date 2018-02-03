angular.module('advertisement', [])
.controller('SelleradvertiseCtrl', function($scope,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading,$cordovaSocialSharing,$filter) {

  $scope.imgurl=imageUrl;
  $rootScope.authCode=localStorage.getItem("ssauthcode");
  $rootScope.customerDetails=JSON.parse(localStorage.getItem("sscustomer"));

  $http.get(baseUrl+'seller/share/2',+$rootScope.customerDetails.id,{
      headers: { "Authorization": 'Bearer '+$rootScope.authCode }
      }).then(function(response){
      	$scope.productadvertise=response.data[0].products;
      	console.log($scope.productadvertise)
      })

    $scope.advertise=function(list){
       $rootScope.advertiselist=list;
       $state.go('app.selleradvertisedetails');
    }
    
    if($rootScope.advertiselist!=null){
      if($scope.advertiselist.stock_status==true){
       $scope.advertiselist.stock_status="In Stock";
      }
      if($scope.advertiselist.stock_status==false){
       $scope.advertiselist.stock_status="Out of Stack";
      }
      if($scope.advertiselist.display_status=="1"){
         $scope.advertiselist.display_status="Enabled";
      }
      if($scope.advertiselist.display_status=="2"){
        $scope.advertiselist.display_status="Disabled";
      }  
    }

    $scope.sharefb=function(message,image,link){
     
      $cordovaSocialSharing
            .shareViaFacebook(message, image, link)
            .then(function(result) {
             return $scope.shareDate(); 
            }, function(err) {
             if(err==false){
              alert(err) 
              /*alert("https://m.facebook.com")*/
               // An error occurred. Show a message to the user 
             }
            });
    }
    
    $scope.shareDate=function(){
      
      $scope.date= $filter('date')(new Date(), 'yyyy-MM-dd');
      var data={
                "seller_id": $rootScope.customerDetails.id,
                "product_id": $rootScope.advertiselist.id,
                "date": $scope.date
               }
               
      $http.post(baseUrl+'seller/share/save',data,{
      headers: { "Authorization": 'Bearer '+$rootScope.authCode }
      }).then(function(response){                   
        $scope.shareUp=response.data;                
       })     
    } 
     
    

   /* $scope.shareImg2=function(message,image,link){
  
      $cordovaSocialSharing
      .shareViaTwitter(message, image, link)
      .then(function(result) {
        
        // Success!
      }, function(err) {
              alert('err')

        // An error occurred. Show a message to the user
      });
    }

    $scope.shareImg3=function(message,image,link){

      $cordovaSocialSharing
      .shareViaWhatsApp(message, image, link)
      .then(function(result) {
        alert('success')
        // Success!
      }, function(err) {
              alert('err')
        
        // An error occurred. Show a message to the user
      });
    }*/

  $scope.whatsappShare=function(){
    window.plugins.socialsharing.shareViaWhatsApp('Digital Signature Maker', null /* img */, "https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker" /* url */, null, function(errormsg){alert("Error: Cannot Share")});
  }
   $scope.twitterShare=function(){
    window.plugins.socialsharing.shareViaTwitter('Digital Signature Maker', null /* img */, 'https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker', null, function(errormsg){alert("Error: Cannot Share")});
  }
   $scope.facebookShare=function(){
     window.plugins.socialsharing.shareViaFacebook('Digital Signature Maker', null, null, 'https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker');
  }
    
})
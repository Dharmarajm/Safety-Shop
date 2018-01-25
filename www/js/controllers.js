angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$rootScope,$window, $ionicModal,$ionicHistory,$ionicSideMenuDelegate,$timeout,$ionicPopup,$http,$state,$ionicLoading) {

 
   $scope.loginData = {username :"", password :""};
   console.log($scope.loginData.username)

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    //console.log('Doing login', $scope.loginData.username);
                       if($scope.loginData.username==""){
                           var alertPopup = $ionicPopup.alert({
                              title: "Error",
                              content: "Please enter your username"
                            })
                      }else if($scope.loginData.password==""){
                             var alertPopup1 =$ionicPopup.alert({
                              title: "Error",
                              content: "Please enter your password"
                            })
                      }else{
                           if($rootScope.reviewsign==1){
                                var login=
                          {
                            "username": $scope.loginData.username,
                            "password": $scope.loginData.password
                          }
                          $http
                          ({
                            method: 'post',
                            url: baseUrl+'integration/customer/token',
                            data: login  
                          })
                          .success(function(data) {
                           // console.log(data);
                            if(data != null){
                              $rootScope.authCode=data;
                              localStorage.setItem("ssauthcode",data);

                             $http.get(baseUrl+'customers/me',{
                                    headers: { "Authorization": 'Bearer '+$rootScope.authCode }
                                     }).then(function(response)
                                  { 
                                   // console.log(response);
                                    localStorage.setItem("sscustomer",JSON.stringify(response.data))
                                    $rootScope.reviewsign=0; 
                                    /*$rootScope.getredirect=1;*/
                                    /*$state.go('app.productdetails');*/
                                    $ionicHistory.goBack();
                                
                               })
                                 
                                }
                             }).error(function(data, status, headers, config){
                          // console.log(data.message);
                           if(data.message != null){
                            alert(data.message)
                           }
                           });  
                          }else{
                             var login=
                          {
                            "username": $scope.loginData.username,
                            "password": $scope.loginData.password
                          }
                          $http
                          ({
                            method: 'post',
                            url: baseUrl+'integration/customer/token',
                            data: login  
                          })
                          .success(function(data) {
                           // console.log(data);
                            if(data != null){
                              $rootScope.authCode=data;
                              localStorage.setItem("ssauthcode",data);

                             $http.get(baseUrl+'customers/me',{
                                    headers: { "Authorization": 'Bearer '+$rootScope.authCode }
                                     }).then(function(response)
                                  { 
                                   // console.log(response);
                                    localStorage.setItem("sscustomer",JSON.stringify(response.data))
                                    $state.go('app.home');
                                /*$ionicHistory.goBack();*/
                                
                               })
                                 
                                }
                             }).error(function(data, status, headers, config){
                          // console.log(data.message);
                           if(data.message != null){
                            alert(data.message)
                           }
                           });
                          }
                          
                        }
}

$scope.signupData={firstname:"",lastname:"",emailid:"",password:"",confirmpassword:""};

$scope.dosignup=function(){

  if($scope.signupData.password != $scope.signupData.confirmpassword){
    alert("Mismatch password");
    return;
  }
  // return;
    var signupData={
      "customer": {
    "id": 0,
    "group_id": 0,
    "confirmation": "true",
    "dob": "",
    "email": $scope.signupData.emailid,
    "firstname": $scope.signupData.firstname,
    "lastname": $scope.signupData.lastname,
    "middlename": "",
    "prefix": "",
    "suffix": "",
    "website_id": 0,
    "disable_auto_group_change": 0,
    "extension_attributes": {
      "is_subscribed": true
    }
  },
  "password": $scope.signupData.password
}

                          $http
                          ({
                            method: 'post',
                            url: baseUrl+'customers/',
                            data: signupData  
                          })
                          .success(function(data) {
                            //console.log(data);
                           //  $state.go('app.home');
                           
                          }).error(function(data, status, headers, config){
                          // console.log(data.message);
                           if(data.message != null){
                            alert(data.message)
                           }
                           });


}


$scope.forgotPasword=function(){
 $scope.data = {};
  var myPopup = $ionicPopup.show({
     template: '<input type="email" ng-model="data.forgotmail" ng-requred="true">',
     title: 'Enter Email-ID',
     subTitle:'' ,
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {

           if (!$scope.data.forgotmail) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
            alert($scope.data.forgotmail)

               var forgotdata={

                              "email": $scope.data.forgotmail,
                              "template": "email_reset",
                              "websiteId": 1
                          
                          }

                          $http
                          ({
                            method: 'put',
                            url: baseUrl+'customers/password',
                            data: forgotdata  
                          })
                          .success(function(data) {
                           // console.log(data);
                            if(data == true){
                              alert('Please See your mail')
                            }
                            
                           
                          }).error(function(data, status, headers, config){
                          // console.log(data.message);
                           if(data.message != null){
                            alert(data.message)
                           }
                           });
           }

          
                 /* if($scope.forgotmail == null){
                    alert("please enter email id");
                    return;
                  }*/
                       
           
         }
       },
     ]
   });
}

 $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });
  $scope.$on('$ionicView.leave', function(){
      $ionicSideMenuDelegate.canDragContent(true);
    });

$scope.signOut=function(){
   var confirmPopup = $ionicPopup.confirm({
           title: 'Sign out',
           template: 'Are you sure want to Sign out?',
          buttons : [{
            text : 'Cancel',
            type : 'button-dark',
          },{
            text : 'Ok',
            type : 'button-positive',
            onTap : function() {
             
              if($rootScope.customerDetails!=null){
                console.log('test')
                $rootScope.customerDetails=null;
                $rootScope.authCode=null;
                $scope.loginData.username = "";
                $scope.loginData.password = "";
                localStorage.clear();
                $state.go('app.home');
               }
               
            }
          }]
        })
 
}

 $scope.clearLocal=function(){
   localStorage.removeItem("editId"); 
 }

/*$scope.groups = [];
  for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };*/

  //$scope.showacc=$scope.show ? 1 : false;
 

})



.controller('PlaylistCtrl', function($scope, $stateParams) {
});

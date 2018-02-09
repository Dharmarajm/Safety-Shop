angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$rootScope,$window, $ionicModal,$ionicHistory,$ionicSideMenuDelegate,$timeout,$ionicPopup,$http,$state,$ionicLoading,$filter) {

 
   $scope.loginData = {username :"", password :""};
   console.log($scope.loginData.username)

   $scope.submitted=false;

   $scope.validateForm=function(){
    $scope.submitted=false;
   }

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
                                     }).then(function onSuccess(response)
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

$scope.signupData={firstname:"",lastname:"",email:"",dob:"",gender:"",company:"",street:"",city:"",postcode:"",state:"",country:"",telephone:"",password:"",confirmpassword:""};
$scope.signupData=[{id:1,name:"Male"},{id:2,name:"Female"}]

 $http.get(baseUrl+'country/list',{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
  }).then(function onSuccess(response){
    $scope.getCountry=response.data[0].countries;
   // $scope.signupData.country=response.data[0].countries[100].label
    $scope.getregion=response.data[0].regions;
    console.log($scope.getregion)
    console.log($scope.getCountry)
  })


$scope.dosignup=function(form){
  console.log(form.firstname.$valid , form.lastname.$valid , form.email.$valid , form.dob.$valid , form.gender.$valid , form.company.$valid , form.street.$valid , form.city.$valid , form.postcode.$valid , form.state.$valid , form.country.$valid , form.telephone.$valid , form.password.$valid , form.confirmpassword.$valid)
  if(form.firstname.$valid && form.lastname.$valid && form.email.$valid && form.dob.$valid && form.gender.$valid && form.company.$valid && form.street.$valid && form.city.$valid && form.postcode.$valid && form.state.$valid && form.country.$valid && form.telephone.$valid && form.password.$valid && form.confirmpassword.$valid){
     if(form.password.$valid == form.confirmpassword.$valid){
        $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
                }); 
        $scope.dateformat= $filter('date')($scope.signupData.dob, 'yyyy-MM-dd');
        console.log($scope.dateformat)
        for(var i in $scope.getregion){
         if($scope.getregion[i].region_id==$scope.signupData.state){
           $scope.regiondetails=$scope.getregion[i];
         }
        }

        var signupData={
                        "customer": {
                        "id": 0,
                        "group_id": 1,
                        "confirmation": "true",
                        "dob": $scope.dateformat,
                        "email": $scope.signupData.email,
                        "firstname": $scope.signupData.firstname,
                        "lastname": $scope.signupData.lastname,
                        "middlename": "",
                        "prefix": "",
                        "suffix": "",
                        "gender": $scope.signupData.gender,
                        "website_id": 0,
                         "addresses": [ {"id": 0,
                                        "customer_id": 0,
                                         "region": {
                                                    "region_code": $scope.regiondetails.region_code,
                                                    "region": $scope.regiondetails.region,
                                                    "region_id": $scope.signupData.state,
                                                    "extension_attributes": {}
                                          },
                                        "region_id": $scope.signupData.state,
                                        "country_id": $scope.signupData.country,
                                        "street": [$scope.signupData.street],
                                        "company":$scope.signupData.company,
                                        "telephone": $scope.signupData.telephone,
                                        "fax": "",
                                        "postcode": $scope.signupData.postcode,
                                        "city": $scope.signupData.city,
                                        "firstname": $scope.signupData.firstname,
                                        "lastname": $scope.signupData.lastname,
                                        "middlename": ""
                                      }],
                        "disable_auto_group_change": 0,
                        "extension_attributes": {
                          "is_subscribed": true
                           }
                        },
                       "password": $scope.signupData.password
                       }
               console.log(signupData)
                          $http
                          ({
                            method: 'post',
                            url: baseUrl+'customers/',
                            data: signupData  
                          })
                          .success(function(data) {
                            console.log(data)
                             if(data){
                               $timeout(function () {
                                 $ionicLoading.hide();
                                 });
                              $ionicPopup.alert({
                               title: 'Customer SignUp',
                               template: 'Customer account has been created',
                               buttons: [
                               {
                                  text: '<b>OK</b>',
                                  type: 'button-positive',
                                  onTap: function() {
                                    $state.go('app.login');
                                  }
                                }]
                              })
                             }
                           
                          }).error(function(data, status, headers, config){
                          // console.log(data.message);
                           if(data.message != null){
                             $timeout(function () {
                               $ionicLoading.hide();
                               });
                            alert(data.message)
                           }
                           });
     }else{
      alert("Password is mismatch")
     }
  }else{
    $scope.submitted=true;
    /*alert("Please enter all the values as valid")*/
  }
  
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
  $scope.submitted=false;
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
              $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
                });
              if($rootScope.customerDetails!=null){

                console.log('test')
                $rootScope.customerDetails=null;
                $rootScope.authCode=null;
                if($scope.loginData!=null){
                  $scope.loginData.username = "";
                  $scope.loginData.password = "";  
                }
                if($scope.sellerloginData!=null){
                  $scope.sellerloginData.username = "";
                  $scope.sellerloginData.password = "";
                }
                localStorage.clear();
                $timeout(function () {
                  $ionicLoading.hide();
                }); 
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

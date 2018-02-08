angular.module('login', [])
.controller('LoginCtrl', function($scope,$rootScope,$window, $ionicModal,$ionicHistory,$timeout,$ionicPopup,$http,$state,$ionicLoading,$filter) {
	$scope.sell={firstName:"",lastName:"",dob:"",gender:"",emailId:"",mobileNo:"",password:"",confirmPassword:"",shopName:"",website:"",shopAddress:"",city:"",state:"",country:"",pinCode:""}

$scope.names=[{id:1,name:"Male"},{id:2,name:"Female"}];
$scope.submitted=false;
$scope.sellerSign=function(form){
 if(form.firstname.$valid && form.lastname.$valid && form.emailId.$valid && form.dob.$valid && form.gender.$valid && form.shopName.$valid && form.shopAddress.$valid && form.city.$valid && form.pinCode.$valid && form.state.$valid && form.country.$valid && form.mobileNo.$valid && form.password.$valid && form.confirmPassword.$valid){  
  if($scope.sell.password==$scope.sell.confirmPassword){
    $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
                }); 
    $scope.dateformat= $filter('date')($scope.sell.dob, 'yyyy-MM-dd');
    var data={
             "customer":{
                         "id": 0,
                          "group_id": 4,
                          "dob": $scope.dateformat,
                          "email": $scope.sell.emailId,
                          "firstname": $scope.sell.firstName,
                          "lastname": $scope.sell.lastName,
                          "middlename": "",
                          "prefix": "",
                          "suffix": "",
                          "gender": $scope.sell.gender,
                          "store_id": 1,
                          "website_id": 1,
                          "shop_name": $scope.sell.shopName,
                          "telephone": $scope.sell.mobileNo,
                          "website": $scope.sell.website,
                          "shop_address": $scope.sell.shopAddress,
                          "city": $scope.sell.city,
                          "state": $scope.sell.state,
                          "country": $scope.sell.country,
                          "pincode": $scope.sell.pinCode,
                          "disable_auto_group_change": 0,
                          "extension_attributes": {
                            "is_subscribed": true  
                          }
                        },
              "password": $scope.sell.password        
          }
 console.log(data)
  $http.post(baseUrl+'seller/signup',data).success(function(response){
    $scope.data=response.data;
    console.log($scope.data)
     $timeout(function () {
                $ionicLoading.hide();
                });
     $ionicPopup.alert({
                               title: 'Seller SignUp',
                               template: "Seller has been created Successfully",
                               buttons: [
                               {
                                  text: '<b>OK</b>',
                                  type: 'button-positive',
                                  onTap: function() {
                                    return;
                                  }
                                }]
                              })
     
     
  }).error(function(response){
    $timeout(function () {
                $ionicLoading.hide();
                });
    alert(response.message)
  })
  }else{
    /*$scope.submitted=true;*/
    alert("Password is mismatch")
  }
 }else{
  $scope.submitted=true;
 }        
}


$scope.sellerloginData = {username :"", password :""};
  

  // Perform the login action when the user submits the login form
  $scope.dosellerLogin = function() {
    //console.log('Doing login', $scope.loginData.username);
                       if($scope.sellerloginData.username==""){
                           var alertPopup = $ionicPopup.alert({
                              title: "Error",
                              content: "Please enter your username"
                            })
                      }else if($scope.sellerloginData.password==""){
                             var alertPopup1 =$ionicPopup.alert({
                              title: "Error",
                              content: "Please enter your password"
                            })
                      }else{
                           var login=
                          {
                            "username": $scope.sellerloginData.username,
                            "password": $scope.sellerloginData.password
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
                                     }).then(function(response){ 
                                    $rootScope.groupID=response.data.group_id;
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
})
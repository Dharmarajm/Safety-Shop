angular.module('login', [])
.controller('LoginCtrl', function($scope,$rootScope,$window, $ionicModal,$ionicHistory,$timeout,$ionicPopup,$http,$state,$ionicLoading) {
	$scope.sell={firstName:"",lastName:"",dob:"",gender:"",emailId:"",mobileNo:"",password:"",confirmPassword:"",shopName:"",website:"",shopAddress:"",city:"",state:"",country:"",pinCode:""}

$scope.names=[{id:1,name:"Male"},{id:2,name:"Female"}];

$scope.sellerSign=function(){
  var data={
             "customer":{
                         "id": 0,
                          "group_id": 4,
                          "dob": $scope.sell.dob,
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
                          "telephone": $scope.sell.shopName,
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

  $http.post(baseUrl+'seller/signup',data).then(function(response){
    $scope.data=response.data;
    console.log($scope.data)
  })        
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
                                     }).then(function(response)
                                  { 
                                    console.log(response);
                                    $rootScope.groupID=response.data.group_id;
                                    localStorage.setItem("sscustomer",JSON.stringify(response.data))
                                 $state.go('app.sellerproduct');
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
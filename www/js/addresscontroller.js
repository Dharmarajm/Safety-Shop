angular.module('address', [])

.controller('AddressCtrl', function($scope, $stateParams,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {


 /*$http.get("http://192.168.1.40:8983/solr/altius_store/select?indent=on&q=*:*&wt=json").then(function(response)
                        { 
                          console.log(response.response);
                         $scope.tenn=response.data;
                      
                     }) 
*/
   $scope.cusdbcode=function(){
     $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });

     $http.get(baseUrl+'customers/me',{
           headers: { "Authorization": 'Bearer '+$rootScope.authCode }
            }).then(function onSuccess(response)
         { 
           
          $scope.addresscus=response.data;
          console.log($scope.addresscus);
          $scope.shippingAddress=[];
          $scope.billingAddress=[];
          $scope.checkaddresscus=response.data.addresses;
          $scope.checkshipaddresscus=response.data.addresses;
          if($scope.checkaddresscus!=null){
             for(var i in $scope.checkaddresscus){
                if($scope.checkaddresscus[i].default_billing==true){
                  $scope.billingAddress=$scope.checkaddresscus[i];
                }else{
                  $scope.billingAddress=[];
                }
             }

          }
          if($scope.checkshipaddresscus!=null){
            for(var i in $scope.checkshipaddresscus){
                if($scope.checkshipaddresscus[i].default_shipping==true){
                  $scope.shippingAddress=$scope.checkshipaddresscus[i];
                  console.log($scope.shippingAddress)
                }
                if($scope.checkshipaddresscus[i].default_shipping==false){
                  $scope.shippingAddress=[];
                }
            }
          }

          $timeout(function () {
            $ionicLoading.hide();
          });  
      })
   }
     
          


           $ionicModal.fromTemplateUrl('addaddress.html', {
              scope: $scope,
              animation: 'slide-in-left'
              }).then(function(addressmodel) {
              $scope.modaladdres = addressmodel;
              });

              $scope.closeaddressmodel = function() {
                $scope.modaladdres.hide();
              };


              $scope.addressadd=function(){
              	$scope.modaladdres.show();
              }

     
     $scope.addressput=function(account){
      if(account.firstname.$valid && account.lastname.$valid && account.email.$valid){
         $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
                });
         $scope.dataput=[];
         for(var i in $scope.addresscus.addresses){
            if($scope.addresscus.addresses[i].fax==undefined || $scope.addresscus.addresses[i].fax==null || $scope.addresscus.addresses[i].fax==""){
              $scope.addresscus.addresses[i].fax="";
            }
            if($scope.addresscus.addresses[i].middlename==undefined || $scope.addresscus.addresses[i].middlename==null || $scope.addresscus.addresses[i].middlename==""){
              $scope.addresscus.addresses[i].middlename="";
            }
            $scope.dataput.push({
                                 "id": $scope.addresscus.addresses[i].id,
                                 "customer_id": $scope.addresscus.addresses[i].customer_id,
                                 // "region": {
                                 //   "region_code": "",
                                 //   "region": "",
                                 //   "region_id": 0,
                                 //   "extension_attributes": {}
                                 // },
                                 "region": $scope.addresscus.addresses[i].region,
                                 "region_id": $scope.addresscus.addresses[i].region.region_id,
                                 "country_id": $scope.addresscus.addresses[i].country_id,
                                 "street": $scope.addresscus.addresses[i].street,
                                 "company":$scope.addresscus.addresses[i].company,
                                 "telephone": $scope.addresscus.addresses[i].telephone,
                                 "fax": $scope.addresscus.addresses[i].fax,
                                 "postcode": $scope.addresscus.addresses[i].postcode,
                                 "city": $scope.addresscus.addresses[i].city,
                                 "firstname": $scope.addresscus.addresses[i].firstname,
                                 "lastname": $scope.addresscus.addresses[i].lastname,
                                 "middlename": $scope.addresscus.addresses[i].middlename
                               })

         }

         if($scope.addresscus.middlename==undefined || $scope.addresscus.middlename==null || $scope.addresscus.middlename==""){
           $scope.addresscus.middlename="";    
         }
         if($scope.addresscus.prefix==undefined || $scope.addresscus.prefix==null || $scope.addresscus.prefix==""){
            $scope.addresscus.prefix=""
         }
         if($scope.addresscus.suffix==undefined || $scope.addresscus.suffix==null || $scope.addresscus.suffix==""){
           $scope.addresscus.suffix="";
         }
         if($scope.addresscus.gender==undefined || $scope.addresscus.gender==null || $scope.addresscus.gender==""){
            $scope.addresscus.gender=3;
         }
         if($scope.addresscus.dob==undefined || $scope.addresscus.dob==null || $scope.addresscus.dob==""){
            $scope.addresscus.dob="";
         }

         var putdata={
                "customer": {
                             "dob": $scope.addresscus.dob,
                             "email": $scope.addresscus.email,
                             "firstname": $scope.addresscus.firstname,
                             "lastname": $scope.addresscus.lastname,
                             "middlename": $scope.addresscus.middlename,
                             "prefix": $scope.addresscus.prefix,
                             "suffix": $scope.addresscus.suffix,
                             "gender": $scope.addresscus.gender,
                             "addresses":$scope.dataput,
                             "website_id":$scope.addresscus.website_id 
                            }
                     }
      console.log(putdata) 

		  $http
          ({
            method: 'put',
            url: baseUrl+'customers/me',
            headers: { "Authorization": 'Bearer '+$rootScope.authCode },
            data:putdata
          })
          .then(function onSuccess(response) {
              $timeout(function () {
                $ionicLoading.hide();
                });
              if(response){
                $ionicPopup.alert({
                               title: 'Customer Details',
                               template: 'Account Information has been updated',
                               buttons: [{
                                  text: '<b>OK</b>',
                                  type: 'button-positive',
                                  onTap: function() {
                                    $scope.closeaddressmodel();
                                  }
                               }]
                })  
              }
             }).catch(function onError(response){
               $timeout(function () {
                $ionicLoading.hide();
                });
               $ionicPopup.alert({
                               title: 'Customer Details',
                               template: 'Failed to connect the server',
                               buttons: [{
                                  text: '<b>OK</b>',
                                  type: 'button-positive',
                                  onTap: function() {
                                    return;
                                  }
                               }]
                })  
           });
      }else{
         alert("Please enter all the values as valid")  
      }     
     }

              
})
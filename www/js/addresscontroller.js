angular.module('address', [])

.controller('AddressCtrl', function($scope, $stateParams,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {


 /*$http.get("http://192.168.1.40:8983/solr/altius_store/select?indent=on&q=*:*&wt=json").then(function(response)
                        { 
                          console.log(response.response);
                         $scope.tenn=response.data;
                      
                     }) 
*/

    $http.get(baseUrl+'customers/me',{
           headers: { "Authorization": 'Bearer '+$rootScope.authCode }
            }).then(function(response)
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
      }) 
          


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


     $scope.addressput=function(){
         var putdata={
                "customer": {
                             "dob": "",
                             "email": "",
                             "firstname": "",
                             "lastname": "",
                             "middlename": "",
                             "prefix": "",
                             "suffix": "",
                             "gender": 0,
                             "addresses": [
                               {
                                 "id": 0,
                                 "customer_id": 0,
                                 "region": {
                                   "region_code": "",
                                   "region": "",
                                   "region_id": 0,
                                   "extension_attributes": {}
                                 },
                                 "region_id": 0,
                                 "country_id": "",
                                 "street": [
                                   ""
                                 ],
                                 "company": "",
                                 "telephone": "",
                                 "fax": "",
                                 "postcode": "",
                                 "city": "",
                                 "firstname": "",
                                 "lastname": "",
                                 "middlename": "",
                               }
                             ]
                            }
                     }


		  $http
          ({
            method: 'put',
            url: baseUrl+'customers/me',
            headers: { "Authorization": 'Bearer '+$rootScope.authCode },
            data:{}
          })
          .success(function(data) {
            console.log(data,"success");
            
             }).error(function(data, status, headers, config){
           console.log(data,status);
          
           
          
           });
     }

              
})
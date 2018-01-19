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
                          console.log(response);
                         $scope.addresscus=response.data;
                      
                     }) 
                      

           $ionicModal.fromTemplateUrl('addaddress.html', {
              scope: $scope,
              animation: 'slide-in-left'
              }).then(function(addressmodel) {
              $scope.modaladdres = addressmodel;
              });

              $scope.closeaddressmodel = function() {
              	//$scope.modaladdres = null;
               $scope.modaladdres.hide();
                /*$scope.modaladdres.remove()
			    .then(function() {
			      
			    });*/
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
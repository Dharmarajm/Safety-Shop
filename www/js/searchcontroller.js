angular.module('search', [])
.controller('SearchCtrl', function($scope,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {
 





  $scope.imgurl=imageUrl;
 
  $scope.serachauto=function(filterword){ 
               $rootScope.filtercat=filterword;
                  if(filterword.length >= 2){

                        $http.get(solrUrl+'suggest_keyword?q='+filterword+'&project_id=base',{
                          headers: { "Authorization": 'Bearer '+$rootScope.authCode }
                        }).then(function(response)
                        {                   
                            //console.log(response);
                           $rootScope.searchVal=response.data;
                          // console.log(response.data)
                                                        
                        })
                      }else{
                        $rootScope.searchVal='';
                        // $rootScope.resultVal='';
                      }
                        }


      $scope.searchResFun=function(key,value){
   
     
      	 $http.get(solrUrl+'search?page_number=1&search_value='+key+ ':'+ value+'&project_id=base&sort=name%20desc',{
                          headers: { "Authorization": 'Bearer '+$rootScope.authCode }
                        }).then(function(response)
                        {                   
                           // console.log(response);
                           $rootScope.resultVal=response.data;
                          // console.log(response.data)
                              $state.go('app.searchresult')                           
                        })
      	
      }   

      $scope.searchResBtn=function(value){
   
     
         $http.get(solrUrl+'search?page_number=1&search_value='+ value+'&project_id=base&sort=name%20desc',{
                          headers: { "Authorization": 'Bearer '+$rootScope.authCode }
                        }).then(function(response)
                        {                   
                           // console.log(response);
                           $rootScope.resultVal=response.data;
                          // console.log(response.data)
                              $state.go('app.searchresult')                           
                        })
        
      }

       $scope.productdetails = function (id,name) {
    
                      var prodetail={ 'id':id,'name':name}
                         $state.go('app.productdetails',{prodetail}  )
                      
                     
              }        

})


.directive('focusMe',['$timeout',function ($timeout) {
  return {
    link: function (scope, element, attrs) {
      if (attrs.focusMeDisable === "true") {
        return;
      }
      $timeout(function () {
        element[0].focus();
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.show(); //open keyboard manually
        }
      }, 350);
    }
  };
}])

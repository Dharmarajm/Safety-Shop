angular.module('SellerProductreviews', [])
.controller('SellerProductreviewsCtrl', function($scope,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {
   $scope.getreview=function(){
    $http.get(baseUrl+'seller/review/view/'+$rootScope.sellertablelist.id,+$rootScope.customerDetails.id,{
      headers: { "Authorization": 'Bearer '+$rootScope.authCode }
      }).then(function(response){
         $scope.productsListReview=response.data[0];
         console.log($scope.productsListReview)
      })    
   }
    

   $scope.reviewListPopup=function(list,getId){
   	$scope.datalistreview=list;
      $scope.datalistproductId=getId.product.id
      console.log($scope.datalistreview)
   	$scope.modalproductdetail.show();		              
   }

   $scope.getStars = function(rating) {
             // Get the value
             var val = parseFloat(rating);
             // Turn value into number/100
             var size = val/5*100;
             return size + '%';
   }

   $scope.isChecked = function(id, matches) {
     var isChecked = id;
     /*console.log(id,matches)*/ 
     if(matches == "Approved" || matches == true) {
       isChecked= true;
        console.log(isChecked)
     }

     if(matches == "Pending" || matches == false){
       isChecked=false;
       console.log(isChecked)
     }

     if(matches == "Not Approved" || matches == false) {
        isChecked = false;
        console.log(isChecked)
     }
    return isChecked;
   }

   $scope.statusState=function(id,state,getId){
    console.log(id,state,getId)
    if(state=="Approved" || state==true){
     $scope.displayStateC="3";
     $scope.datalistreview.status="Approved"
    }
    
    if(state=="Pending" || state==false){
     $scope.displayStateC="1";
     $scope.datalistreview.status="Pending"
    }

    if(state=="Not Approved" || state==false){
      $scope.displayStateC="1"
      $scope.datalistreview.status="Not Approved"
    }
    console.log($scope.displayStateC)
    var data={
              "seller_id": $rootScope.customerDetails.id,
              "product_id": getId,
              "review_id": id,
              "status": $scope.displayStateC
             };
    console.log(data)         

    $http.post(baseUrl+'seller/review/status',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
      }).then(function(response){                     
         $scope.Statesuccess=response.data[0].status;
         if($scope.Statesuccess=="SUCCESS"){
            $scope.getreview();
            return $scope.isChecked(id,state); 
         }
        })
   }

   $ionicModal.fromTemplateUrl('reviewfulldatail.html', {
	scope: $scope,
	animation: 'slide-in-left'
	}).then(function(modalproductdetails) {
		
	$scope.modalproductdetail = modalproductdetails;
	});
   $scope.closeproductdetails = function() {
	  $scope.modalproductdetail.hide();
     $scope.getreview();
   }  
}); 
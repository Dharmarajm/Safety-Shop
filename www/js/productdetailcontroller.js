angular.module('productdetail', ['ionic-ratings'])

.controller('ProductDetailCtrl', function($scope, $sce,$stateParams,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {






   $scope.ratingsObject = {
        iconOn: 'ion-ios-star',    //Optional 
        iconOff: 'ion-ios-star-outline',   //Optional 
        iconOnColor: 'rgb(200, 200, 100)',  //Optional 
        iconOffColor:  'rgb(200, 100, 100)',    //Optional 
        rating:  0, //Optional 
        minRating:0,    //Optional 
        readOnly: true, //Optional 
        callback: function(rating, index) {    //Mandatory 
          //$scope.ratingsCallback(rating, index);
           $scope.ratingstatus=rating;
        }
      };
  
 
			  $scope.getStars = function(rating) {
			    // Get the value
			    var val = parseFloat(rating);
			    // Turn value into number/100
			    var size = val/5*100;
			    return size + '%';
			  }



				$rootScope.customer=function(){

				$scope.modalproductdetail.show();


				};

				$scope.loginpage=function(){
					// $scope.reviewdetails.hide();
					$state.go('app.login')
				}

				$scope.reviewBtn=function(){
                     if($rootScope.authCode == null){
                     	$state.go('app.login')
                     }else{ 
                     	$scope.review={"name":$rootScope.customerDetails.firstname,"summay":'',"detail":''}
                       $scope.reviewdetails.show();
                     }   
					 
				}

				 $ionicLoading.show({
				    content: 'Loading',
				    animation: 'fade-in',
				    showBackdrop: true,
				    maxWidth: 200,
				    showDelay: 0
				  });

					$scope.productname=$stateParams.prodetail.name;

					$http.get(baseUrl+'product/'+$stateParams.prodetail.id,{
					headers: { "Authorization": 'Bearer '+$rootScope.authCode }
					}).then(function(response)
					{ 
					//console.log(response);
					$timeout(function () {
					$ionicLoading.hide();
					});  
					// $scope.prodetailsres=response.data;
					/*$scope.Image = "http://safetyshop.in/home/pub/media/catalog/product"+response.data.custom_attributes[6].value;*/

					$scope.productRes=response.data;

					$http.get(baseUrl+'review/reviews/'+$scope.productRes.id,{
					headers: { "Authorization": 'Bearer '+$rootScope.authCode }
					}).then(function(response)
					{                   
					//console.log(response.data[0].avg_rating_percent/20,"review");
					var rat=(response.data[0].avg_rating_percent/20).toString();
					// alert(rat)
					$scope.ratings = [{ name: 'Speed', number: rat }];
					})





					for(var i in $scope.productRes.custom_attributes){

					if($scope.productRes.custom_attributes[i].attribute_code == "product_seller_id"){         
					   $scope.seller_id=$scope.productRes.custom_attributes[i].value;
					}
					if($scope.productRes.custom_attributes[i].attribute_code == "thumbnail"){     
					$scope.Image=imageUrl+$scope.productRes.custom_attributes[i].value;
					}
					if($scope.productRes.custom_attributes[i].attribute_code == "more_information"){     
					$scope.spec=$scope.productRes.custom_attributes[i].value;
					//console.log( $scope.desc);
					}
					if($scope.productRes.custom_attributes[i].attribute_code == "description"){     
					$scope.desc=$scope.productRes.custom_attributes[i].value;
					//$scope.desc=$sce.trustAsHtml($scope.productRes.custom_attributes[i].value);

					//console.log( $scope.desc);
					}


					}


					$scope.Desc = response.data.custom_attributes[1].value;
					$scope.Itemid = response.data.sku;
					}) 




                        
                                   



			          $ionicModal.fromTemplateUrl('customerdetails.html', {
			              scope: $scope,
			              animation: 'slide-in-left'
			              }).then(function(modalproductdetails) {
			              	
			              $scope.modalproductdetail = modalproductdetails;
			              });

			              $scope.closeproductdetails = function() {
			               $scope.modalproductdetail.hide();


			              }

			               $ionicModal.fromTemplateUrl('reviewdetails.html', {
			              scope: $scope,
			              animation: 'slide-in-left'
			              }).then(function(reviewdetail) {
			              	
			              $scope.reviewdetails = reviewdetail;
			              });

			              $scope.closereviewdetails = function() {
			               $scope.reviewdetails.hide();


			              }


			              

			              $scope.customerSubmit=function(data){
			              	//console.log($scope.productRes,data)

			              	if($rootScope.customerDetails.id!=null){
                             $scope.customerID=$rootScope.customerDetails.id;
			              	}else{
                             $scope.customerID=0;
			              	}
                           
	                       var customerdata={
	                       	"seller_id": $scope.seller_id,
	                       	"customer_id": $scope.customerID,
							"product_id": $scope.productRes.id,
							"product_sku": $scope.productRes.sku,
							"contact_name": data.Name,
							"phone": data.PhoneNumber,
							"email": data.EmailID,
							"city": data.city,
							"overview": data.BriefOverview,
	                       }
                           console.log(customerdata)

                            
                          $http
                          ({
                            method: 'post',
                            url: baseUrl+'quickrfq/',
                            data: customerdata  
                          })
                          .success(function(data) {
                           $ionicPopup.alert({
                             title: 'Customer Details',
                             template: 'Your details has been updated',
                             buttons: [
                             {
                                text: '<b>OK</b>',
                                onTap: function() {
                                  return;
                                }
                              }]
                           })
                           
                          }).error(function(data, status, headers, config){
                           //console.log(data.message);
                           if(data.message != null){
                            alert(data.message)
                           }
                           });

			              }


			              $scope.reviewSubmit=function(value){
                                console.log(value)
                     if($rootScope.authCode != null){



                                var reviewdata={
								"productId": $scope.productRes.id,
								"title": value.summay,
								"detail": value.detail,
								"nickname": value.name,
								"ratingVoteId": "1",
								"ratingOptionId": $scope.ratingstatus,
								"customer_id": $rootScope.customerDetails.id,
								"store_id": "1"
                       }
                            
                          $http
                          ({
                            method: 'post',
                            url: baseUrl+'review/mine/post/',
                             headers: { "Authorization": 'Bearer '+$rootScope.authCode },
                            data: reviewdata  
                          })
                          .success(function(data) {
                           $ionicPopup.alert({
                             title: 'Review Details',
                             template: 'Review Updated Sucessfully',
                             buttons: [
                             {
                                text: '<b>OK</b>',
                                onTap: function() {
                                  return;
                                }
                              }]
                           })
                           
                          }).error(function(data, status, headers, config){
                           //console.log(data.message);
                           if(data.message != null){
                            alert(data.message)
                           }
                           });
                     }
			              }


})


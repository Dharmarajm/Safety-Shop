angular.module('enquiry', [])
.controller('EnquiryCtrl', function($scope,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading) {
 
 $scope.enquiryinit=function(){
  var data={
            "seller_id": $rootScope.customerDetails.id,
  	        "from_date": "2018-01-01",
 	        "to_date": "2018-01-10"
           } 
 
 $http.post(baseUrl+'seller/enquiry/inbox',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
  }).then(function(response){                     
     $rootScope.enquirylist=response.data[0].inbox;
     console.log($scope.enquirylist)
    })
 
 

  $http.get(baseUrl+'seller/enquiry/important/'+$rootScope.customerDetails.id,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
  }).then(function(response){ 
     if(response.data[0]!=undefined){
      $rootScope.importantlist=response.data[0].important;
      console.log($rootScope.importantlist)	
      }else{
      $rootScope.importantlist=[];
     }         
      
    })

  
 $http.get(baseUrl+'seller/enquiry/reply/'+$rootScope.customerDetails.id,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
  }).then(function(response){                     
     $rootScope.sentlist=response.data[0].reply;
     console.log($scope.sentlist)
    }) 

  
 } 

 $scope.getStyle=function(id){
  if(id.move_to=="Important"){
  	 return {'color':'blue'};
  	}else{
     return;
    }
 }
 

 $scope.moveimportant=function(Id){
  console.log(Id)
  if($scope.longPress!=true){
   if(Id.move_to=="Important"){
    var data={
             "seller_id": $rootScope.customerDetails.id,
	         "enquiry_ids": [Id.quickrfq_id],
	         "move_to": "inbox"
            }

   $http.post(baseUrl+'seller/enquiry/move',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
    }).then(function(response){                     
       $scope.moveToimport=response.data;
       $scope.enquiryinit();
       $scope.getStyle(Id)
       console.log($scope.moveToimport)
      })
  }else{
      
     var data={
             "seller_id": $rootScope.customerDetails.id,
	         "enquiry_ids": [Id.quickrfq_id],
	         "move_to": "important"
            }

   $http.post(baseUrl+'seller/enquiry/move',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
    }).then(function(response){                     
       $scope.moveToimport=response.data;
       console.log('elsefirst')
       $scope.enquiryinit();
       $scope.getStyle(Id)
       console.log($scope.moveToimport)
      })
  }
  } 
 }

  $scope.msgreply=function(id){
  	$scope.getId=id;
  	$scope.modalproductdetail.show();
  }

 $scope.inboxdetail=function(id){
   if($scope.longPress!=true){
     $rootScope.getinboxId=id;
     $rootScope.getsentId=null;
     $rootScope.getimportantId=null;
     $state.go("app.emaildetails");	
   }
 } 
 
 $scope.sentdetail=function(id){
  $rootScope.getsentId=id;
  $rootScope.getinboxId=null;
  $rootScope.getimportantId=null;
  console.log($rootScope.getsentId)
  $state.go("app.emaildetails");
 }
 
 $scope.importantdetail=function(id){
  $rootScope.getimportantId=id;
  $rootScope.getinboxId=null;
  $rootScope.getsentId=null;
  $state.go("app.emaildetails"); 
 }

 if($rootScope.getinboxId!=null){
   $scope.message="Message";  
 }
 
 if($rootScope.getsentId!=null){
   $scope.message="Sent Message";
 }

 if($rootScope.getimportantId!=null){
   $scope.message="Important Message";  
 }
 

 $ionicModal.fromTemplateUrl('actionReply.html', {
  scope: $scope,
  animation: 'slide-in-left'
  }).then(function(modalproductdetails) {
  	
  $scope.modalproductdetail = modalproductdetails;
  });

  $scope.closemsgdetails = function() {
   $scope.modalproductdetail.hide();
  }

  $scope.replySubmit=function(reply,id){
  	/*console.log(reply,id)
    var data={
               "enquiry_id": id,
	           "reply_subject": reply.subject,
	           "reply_message": reply.message,
	           "secondary_email": reply.secondarymail,
	           "attachment_file": "{{base 64 format}}",
	           "attachment_name": "{{filename}}"
             }

    $http.post(baseUrl+'seller/sendreply',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
     }).then(function(response){                     
        $scope.replyget=response.data;
        console.log($scope.replyget)
       })*/
  }

  $scope.messagedel=function(li){
   console.log(li)
   /*if($rootScope.listid!=null){
    var data={
                "enquiry_id": $rootScope.listid.quickrfq_id,
	            "seller_id": $rootScope.listid.seller_id
             }

  	$http.post(baseUrl+'seller/enquiry/delete',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
    }).then(function(response){                     
       $scope.mesdelete=response.data;
       $rootScope.listid=null;
       console.log($scope.moveToimport)
      })
   }*/
  }
  $scope.itemOnLongPress = function(id) {
  	$rootScope.listid=id;
  }

  $scope.itemOnTouchEnd = function(id) {
  	/*alert(id);*/
  }
 $scope.longpress=function(id){
  if($rootScope.listid!=null){
    if($rootScope.listid.quickrfq_id==id){
  	  alert($rootScope.listid);
  	   if($scope.longPress==true){
        alert($scope.longPress);
        $scope.longPress=false;
  	    $rootScope.listid=null;
  	   }
    }	
  }
 }

 $scope.longPress=false;

 /*var a = [{"status": false,"id":10},{"status": false,"id":10}], b = [{"status": false,"id":20},{"status": false,"id":50}];

b.forEach(function(value){
	console.log(value)
  if (a.indexOf(value)==-1) a.push(value); console.log(a)
});*/
 
 $scope.setdelete=[{"status": false,"id":1000}];
 $scope.setIconClick=function(id){
 	/*for(var i in $rootScope.enquirylist){
 	 if($rootScope.enquirylist[i].quickrfq_id==id){
 	 	console.log($scope.longPress)
       $scope.longPress = !$scope.longPress;
     }	
 	}*/
 	for(var i in $rootScope.enquirylist){
     
 	 if($rootScope.enquirylist[i].quickrfq_id==id){
 	 	if($scope.longPress==true){
 	 	   /*if($scope.setdelete.length!=0){
 	 	   	if ($scope.setdelete.indexOf($scope.setdelete[i]) !== -1) {
             $scope.setdelete.push({"status": false,"id":id});
 	 	     console.log($scope.setdelete)
            }
 	 	   }*/
 	 	  if($scope.setdelete.length!=0){ 
 	 	   for(var i=0; i < $scope.setdelete.length;i++){
              if ($scope.setdelete[i].indexOf(id) != -1) {
                 console.log('test') 
              }
 	 	   }
 	 	  }
 	 	 	
 	 	 }	
 	 	

 	 	if($scope.longPress==false){
 	 		/*if($scope.setdelete.length!=0){
 	 	   	if (valuesSoFar.indexOf(value) !== -1) {
             $scope.setdelete.push({"status": false,"id":id});
 	 	     console.log($scope.setdelete)
            }
 	 	   } */

 	 	   if($scope.setdelete.length!=0){ 
 	 	   for(var i=0; i < $scope.setdelete.length;i++){
              if ($scope.setdelete[i].indexOf(id) != -1) {
                 console.log('test') 
              }
 	 	   }
 	 	  }
 	 	}
     }	
 	}
   
   
 }

}).directive('onLongPress', function($timeout) {
	return {
		restrict: 'A',
		link: function($scope, $elm, $attrs) {
			$elm.bind('touchstart', function(evt) {
				// Locally scoped variable that will keep track of the long press
                /*if($scope.longPress==true){
                   $scope.longPress=false;
                }
                if($scope.longPress==false){
                   $scope.longPress=true;
                } */
                console.log(evt);
				$scope.longPress = true;
                 
				// We'll set a timeout for 600 ms for a long press
				$timeout(function() {
					if ($scope.longPress) {
						// If the touchend event hasn't fired,
						// apply the function given in on the element's on-long-press attribute
						$scope.show=true;
						$scope.$apply(function() {
							$scope.$eval($attrs.onLongPress)
							console.log($scope.$eval($attrs.onLongPress));
						});
					}
				}, 1000);
			});

			/*$elm.bind('touchend', function(evt) {
				// Prevent the onLongPress event from firing
				$scope.longPress = false;
				// If there is an on-touch-end function attached to this element, apply it
				if ($attrs.onTouchEnd) {
					$scope.$apply(function() {
						$scope.$eval($attrs.onTouchEnd)
					});
				}
			});*/
		}
	};
})
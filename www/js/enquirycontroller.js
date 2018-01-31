angular.module('enquiry', ['ionicLetterAvatarSelector'])
.controller('EnquiryCtrl', function($scope,$rootScope,$window, $ionicModal, $timeout,$ionicPopup,$http,$state,$ionicLoading,$cordovaFileTransfer,$cordovaImagePicker,$ionicLetterAvatarSelector,$filter) {
 
 $scope.enquiryinit=function(){
  $scope.datematch= $filter('date')(new Date(), 'yyyy-MM-dd');
  var data={
            "seller_id": $rootScope.customerDetails.id,
  	        "from_date": "2018-01-01",
 	          "to_date": $scope.datematch
           } 
 $http.post(baseUrl+'seller/enquiry/inbox',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
  }).then(function(response){                     
     $rootScope.enquirylist=response.data;
     console.log($rootScope.enquirylist)
    })
 
 

  $http.get(baseUrl+'seller/enquiry/important/'+$rootScope.customerDetails.id,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
  }).then(function(response){ 
     if(response.data[0]!=undefined){
      $rootScope.importantlist=response.data;
      console.log($rootScope.importantlist)
      }else{
      $rootScope.importantlist=[];
     }         
      
    })

  
 $http.get(baseUrl+'seller/enquiry/reply/'+$rootScope.customerDetails.id,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
  }).then(function(response){                     
     $rootScope.sentlist=response.data;
    }) 

  
 } 

 
 if($state.current.name=='app.emaildetails'){
   var data={
             "enquiry_id": $rootScope.getinboxId.quickrfq_id,
             "status": "Read"
            }

   $http.post(baseUrl+'seller/enquiry/status',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
   }).then(function(response){                     
     $rootScope.enquirystatus=response.data;
    })

 }

 $scope.$on($ionicLetterAvatarSelector.stateChanged, function($event, selectionActive) {
        $scope.selectionActive = selectionActive;
    });
    
    $scope.finish = $ionicLetterAvatarSelector.finish;
    
 $scope.delete= function() {
  
  var chats = $rootScope.enquirylist[0].inbox;
  var selectedIDs = $ionicLetterAvatarSelector.getData();
  selectedIDs.forEach(function(id) {
   var chat = chats.filter(function(chat) {
       return chat.quickrfq_id === id.quickrfq_id;
    })[0];
   }); 
    $scope.selectedID=selectedIDs; 
     
    $ionicPopup.alert({
                             title: 'Message delete',
                             template: 'Are you sure want to delete?',
                             buttons: [
                             {
                                text: '<b>Cancel</b>',
                                type: 'button-dark',
                                onTap: function(e) {
                                  return;
                                }
                              },
                              {
                                text: '<b>OK</b>',
                                type: 'button-positive',
                                onTap: function(e) {
                                  
                                   
                                  console.log($scope.selectedID)
                                   
                                   $scope.finish();
                                   var data={
                                             "enquiry_id": $scope.selectedID[0].quickrfq_id,
                                             "seller_id": $scope.selectedID[0].seller_id
                                            }

                                 $http.post(baseUrl+'seller/enquiry/delete',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
                                 }).then(function(response){                     
                                    $scope.mesdelete=response.data;
                                    $rootScope.listid=null;
                                    $scope.enquiryinit();
                                    $scope.getStyle(Id)
                                    console.log($scope.moveToimport)
                                   })
                                }
                              }]
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
       $scope.enquiryinit();
       $scope.getStyle(Id)
      })
  }
  } 
 }

  $scope.msgreply=function(id){
  	$scope.getId=id;
  	$scope.modalproductdetail.show();
  }

 $scope.inboxdetail=function(id){
   
     $rootScope.getinboxId=id;
     $rootScope.getsentId=null;
     $rootScope.getimportantId=null;
     $state.go("app.emaildetails");	
 } 
 
 $scope.sentdetail=function(id){
  $rootScope.getsentId=id;
  $rootScope.getinboxId=null;
  $rootScope.getimportantId=null;
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
  
})
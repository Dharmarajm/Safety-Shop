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
   $scope.reply.subject="";
   $scope.reply.message="";
   $scope.reply.secondarymail="";
   $scope.reply.attachment="";
  }
  
  $scope.reply={ subject:"",message:"",secondarymail:"",attachment:""}

  $scope.replySubmit=function(reply,id){

    /*console.log(reply)
    
    $cordovaFile.copyFile(cordova.file.dataDirectory, "file.txt", cordova.file.tempDirectory, "new_file.txt")
      .then(function (success) {
        // success
      }, function (error) {
        // error
      });

    var targetPath = cordova.file.documentsDirectory + $scope.reply.attachment
    console.log(targetPath)
    alert(targetPath)
  // File name only
  var filename = targetPath.split("/").pop();
   
  var options = {
       fileKey: "file",
       fileName: filename,
       chunkedMode: false,
       mimeType: "multipart/form-data",
   };

   $cordovaFileTransfer.upload(baseUrl+'seller/sendreply', targetPath, options).then(function (result) {
       console.log("SUCCESS: " + JSON.stringify(result.response));
          alert("sucess");
         alert(result.response);
   }, function (err) {
          alert("error");
       console.log("ERROR: " + JSON.stringify(err));
       alert(err);
   }, function (progress) {
       // PROGRESS HANDLING GOES HERE
   })*/
  	console.log(reply,id)
    var data={
               "enquiry_id": id,
	           "reply_subject": reply.subject,
	           "reply_message": reply.message,
	           "secondary_email": reply.secondarymail,
	           "attachment_file": $scope.getfile[0].format,
	           "attachment_name": $scope.getfile[0].file
             }

    $http.post(baseUrl+'seller/sendreply',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
     }).then(function(response){                     
        $scope.replyget=response.data;
        console.log($scope.replyget)
       })
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

  /*$scope.pickfile=function(){
    fileChooser.open(function(uri) {
     alert(uri);
     console.log(uri)
    });
  }*/

  $scope.upload = function(){
    document.getElementById('fileu').click();
   $scope.fileNameChanged = function(filoename) {
    alert(filoename.files)
    console.log(filoename.files);
    $scope.getfile=[];
    var preview ="";
    var reader  = new FileReader(); 
    reader.addEventListener("load", function () {
     preview = reader.result;
     $rootScope.getfileData=preview;
     $scope.getfile.push({"file":filoename.files[0].name,"format":$rootScope.getfileData})
     console.log($scope.getfile[0])
    }, false);

    if (filoename.files[0]) {
      reader.readAsDataURL(filoename.files[0]);
      console.log(reader.readAsDataURL(filoename.files[0]))
    }
    /*var uripath = 'content://com.google.android.apps.photos.contentprovider/0/1/content......';

    window.FilePath.resolveNativePath(uripath, successNative, failNative);
            
    function failNative(e) {
        console.error('Houston, we have a big problem :(');
    }

    function successNative(finalPath) {
        console.log(finalPath)
        var path = 'file://'+ finalPath;
        
        window.resolveLocalFileSystemURL(path, success, fail);
            
        function fail(e) {
              console.error(e);
        }

        function success(fileEntry) {
           fileEntry.file(function(file) {
                   var reader = new FileReader();
                   reader.onloadend = function (evt) {
                     var imgData = evt.target.result; // this is your Base64 string
                     console.log(imgData);                      
                     $rootScope.getimgData=imgData
                   };
               reader.readAsText(file); // Finally !
               $scope.getfile.push({"file":file.name,"format":$rootScope.getimgData})
               console.log($scope.getfile)
           });
        }
    }*/

    /*window.resolveLocalFileSystemURL( filePath, function (fileEntry){
    console.log('got a file entry');
      fileEntry.file(function (file) {
        console.log('created file');
        console.log(file.localURL);
      })
    }, function (e) {
      console.log('Error resolving fs url', e);
    });*/
   }
  } 

})
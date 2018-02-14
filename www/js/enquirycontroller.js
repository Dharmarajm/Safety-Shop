angular.module('enquiry', ['ionicLetterAvatarSelector'])
  .controller('EnquiryCtrl', function($scope, $rootScope, $window, $ionicModal, $timeout, $ionicPopup, $http, $state, $ionicLoading, $cordovaFileTransfer, $cordovaImagePicker, $ionicLetterAvatarSelector, $filter) {

    $scope.enquiryinit = function() {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      $scope.datematch = $filter('date')(new Date(), 'yyyy-MM-dd');
      var data = {
        "seller_id": $rootScope.customerDetails.id,
        "from_date": "2018-01-01",
        "to_date": $scope.datematch
      }
      $http.post(baseUrl + 'seller/enquiry/inbox', data, {
        headers: {
          "Authorization": 'Bearer ' + $rootScope.authCode
        }
      }).then(function(response) {
        $rootScope.enquirylist = response.data;
        console.log($rootScope.enquirylist)
      })



      $http.get(baseUrl + 'seller/enquiry/important/' + $rootScope.customerDetails.id, {
        headers: {
          "Authorization": 'Bearer ' + $rootScope.authCode
        }
      }).then(function(response) {
        if (response.data[0] != undefined) {
          $rootScope.importantlist = response.data;
          console.log($rootScope.importantlist)
        } else {
          $rootScope.importantlist = [];
        }

      })


      $http.get(baseUrl + 'seller/enquiry/reply/' + $rootScope.customerDetails.id, {
        headers: {
          "Authorization": 'Bearer ' + $rootScope.authCode
        }
      }).then(function(response) {
        $rootScope.sentlist = response.data;
        console.log($rootScope.sentlist)
        $timeout(function() {
          $ionicLoading.hide();
        });
      })
    }


    if ($state.current.name == 'app.emaildetails' && $rootScope.getinboxId != null || $state.current.name == 'app.emaildetails' && $rootScope.getimportantId != null) {

      if ($rootScope.getinboxId != null) {
        $scope.getCurrentID = $rootScope.getinboxId.quickrfq_id;
        console.log($scope.getCurrentID)
      } else if ($rootScope.getimportantId != null) {
        $scope.getCurrentID = $rootScope.getimportantId.quickrfq_id
      }
      var data = {
        "enquiry_id": $scope.getCurrentID,
        "status": "Read"
      }

      $http.post(baseUrl + 'seller/enquiry/status', data, {
        headers: {
          "Authorization": 'Bearer ' + $rootScope.authCode
        }
      }).then(function(response) {
        $rootScope.enquirystatus = response.data;
      })

    }

    $scope.$on($ionicLetterAvatarSelector.stateChanged, function($event, selectionActive) {
      $scope.selectionActive = selectionActive;
    });

    $scope.finish = $ionicLetterAvatarSelector.finish;

    $scope.delete = function() {

      var chats = $rootScope.enquirylist[0].inbox;
      var selectedIDs = $ionicLetterAvatarSelector.getData();
      selectedIDs.forEach(function(id) {
        var chat = chats.filter(function(chat) {
          return chat.quickrfq_id === id.quickrfq_id;
        })[0];
      });
      $scope.selectedID = selectedIDs;

      $ionicPopup.alert({
        title: 'Message delete',
        template: 'Are you sure want to delete?',
        buttons: [{
          text: '<b>Cancel</b>',
          type: 'button-dark',
          onTap: function(e) {
            return;
          }
        }, {
          text: '<b>OK</b>',
          type: 'button-positive',
          onTap: function(e) {
            $ionicLoading.show({
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });

            console.log($scope.selectedID)

            if ($scope.selectedID[0].reply_id == undefined) {

              $scope.finish();

              var data = {
                "enquiry_id": $scope.selectedID[0].quickrfq_id,
                "seller_id": $scope.selectedID[0].seller_id
              }

              $http.post(baseUrl + 'seller/enquiry/delete', data, {
                headers: {
                  "Authorization": 'Bearer ' + $rootScope.authCode
                }
              }).then(function(response) {
                $scope.mesdelete = response.data;
                $rootScope.listid = null;
                $scope.enquiryinit();
                $state.reload();
                /*$scope.getStyle()*/
                /*console.log($scope.moveToimport)*/
                $timeout(function() {
                  $ionicLoading.hide();
                });
              })
            } else {
              console.log('test')
              $scope.finish();
              $scope.enquiryinit();
              $state.reload();
              $timeout(function() {
                $ionicLoading.hide();
              });
            }
          }
        }]
      })

    }


    $scope.getStyle = function(id) {
      if (id.move_to == "Important") {
        return {
          'color': 'blue'
        };
      } else {
        return;
      }
    }


    $scope.moveimportant = function(Id) {
      if ($scope.longPress != true) {
        if (Id.move_to == "Important") {
          var data = {
            "seller_id": $rootScope.customerDetails.id,
            "enquiry_ids": [Id.quickrfq_id],
            "move_to": "inbox"
          }

          $http.post(baseUrl + 'seller/enquiry/move', data, {
            headers: {
              "Authorization": 'Bearer ' + $rootScope.authCode
            }
          }).then(function(response) {
            $scope.moveToimport = response.data;
            $scope.enquiryinit();
            $scope.getStyle(Id)
          })
        } else {

          var data = {
            "seller_id": $rootScope.customerDetails.id,
            "enquiry_ids": [Id.quickrfq_id],
            "move_to": "important"
          }

          $http.post(baseUrl + 'seller/enquiry/move', data, {
            headers: {
              "Authorization": 'Bearer ' + $rootScope.authCode
            }
          }).then(function(response) {
            $scope.moveToimport = response.data;
            $scope.enquiryinit();
            $scope.getStyle(Id)
          })
        }
      }
    }

    $scope.msgreply = function(id) {
      $scope.getId = id;
      $scope.submitted = false;
      $scope.modalproductdetail.show();
    }

    $scope.inboxdetail = function(id) {

      $rootScope.getinboxId = id;
      $rootScope.getsentId = null;
      $rootScope.getimportantId = null;
      $state.go("app.emaildetails");
    }

    $scope.sentdetail = function(id) {
      $rootScope.getsentId = id;
      $rootScope.getinboxId = null;
      $rootScope.getimportantId = null;
      $state.go("app.emaildetails");
    }

    $scope.importantdetail = function(id) {
      $rootScope.getimportantId = id;
      $rootScope.getinboxId = null;
      $rootScope.getsentId = null;
      $state.go("app.emaildetails");
    }

    if ($rootScope.getinboxId != null) {
      $scope.message = "Message";
    }

    if ($rootScope.getsentId != null) {
      $scope.message = "Sent Message";
    }

    if ($rootScope.getimportantId != null) {
      $scope.message = "Important Message";
    }


    $ionicModal.fromTemplateUrl('actionReply.html', {
      scope: $scope,
      animation: 'slide-in-left'
    }).then(function(modalproductdetails) {

      $scope.modalproductdetail = modalproductdetails;
      $scope.getfile = [];
      $scope.getattachfilename = "No file chosen";
    });

    $scope.closemsgdetails = function() {
      $scope.modalproductdetail.hide();
      $scope.reply.subject = "";
      $scope.reply.message = "";
      $scope.reply.secondarymail = "";
      $scope.getfile = [];
      $scope.submitted = false;
    }

    $scope.reply = {
      subject: "",
      message: "",
      secondarymail: ""
    }

    $scope.replySubmit = function(msg, reply, id) {
      console.log($scope.reply.secondarymail=="")
      console.log($scope.reply.secondarymail==null)
      console.log($scope.reply.secondarymail==undefined)

      if (msg.subject.$valid && msg.message.$valid && $scope.reply.secondarymail=="" || msg.subject.$valid && msg.message.$valid && msg.email.$valid) {
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
        if ($scope.getfile == undefined || $scope.getfile.length == 0 || $scope.getfile == null) {
          $scope.getfile = [{
            file: "",
            format: ""
          }]
          console.log($scope.getfile)
        }
        console.log($scope.getfile)
        var data = {
          "enquiry_id": id,
          "reply_subject": reply.subject,
          "reply_message": reply.message,
          "secondary_email": reply.secondarymail,
          "attachment_name": $scope.getfile[0].file,
          "attachment_file": $scope.getfile[0].format
        }
        console.log(data)
        $http.post(baseUrl + 'seller/sendreply', data, {
          headers: {
            "Authorization": 'Bearer ' + $rootScope.authCode
          }
        }).then(function onSuccess(response) {
          if (response.data) {
            $timeout(function() {
              $ionicLoading.hide();
            });
            $ionicPopup.alert({
              title: 'Customer Reply',
              template: "You're " + response.data[0].msg,
              buttons: [{
                text: '<b>OK</b>',
                type: 'button-positive',
                onTap: function() {
                  if (response.data[0].msg == "Uploaded file format is not accepted. (plain)") {
                    return;
                  }
                  $scope.closemsgdetails();
                }
              }]
            })
          }
        }).catch(function onError(response) {
          $timeout(function() {
            $ionicLoading.hide();
          });
          $ionicPopup.alert({
            title: 'Customer Reply',
            template: 'Failed to connect the server',
            buttons: [{
              text: '<b>OK</b>',
              type: 'button-positive',
              onTap: function() {

                return;
              }
            }]
          })
        })
      } else {
        $scope.submitted = true;
      }
    }

    /*$scope.messagedel=function(li){
   if($rootScope.listid!=null){
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
   }
  }*/

    $scope.getfile = [];
    $scope.fileform = {};
    //   $scope.upload = function(){
    //     $scope.getattachfilename="No file chosen";
    //     $scope.getfile=[];
    //     document.getElementById('fileu').click();
    //     $scope.fileNameChanged = function(filoename) {
    //     $scope.getfile=[];

    //     var preview;
    //     if(filoename.files.length!=0){

    //       if(filoename.files[0].size <= 2000000){

    //         var reader  = new FileReader(); 
    //         reader.onloadend = function (evt) {

    //         preview = evt.target.result;
    //         $rootScope.getfileData=preview;
    //         $scope.getfile.push({"file":filoename.files[0].name,"format":$rootScope.getfileData})
    //         $scope.getattachfilename=filoename.files[0].name;
    //         $scope.$apply(function (){
    //             $scope.getattachfilename=filoename.files[0].name;
    //         });
    //         };
    //         if (filoename.files[0]) {
    //          reader.readAsDataURL(filoename.files[0]);
    //         }
    //       }else{
    //         $scope.getattachfilename="No file chosen";
    //         $scope.getfile=[];
    //         alert("Selected file is too big")
    //         $scope.$apply();
    //       }
    //     }else{
    //       $scope.getattachfilename="No file chosen";
    //       $scope.$apply();
    //     }
    //    }

    //   }

    $scope.uploadImage = function(filoename) {
      $scope.filoename = filoename;
      console.log(filoename)
      $scope.getfile = [];
      var preview;
      if (filoename.files.length != 0) {

        if (filoename.files[0].size <= 2000000) {

          var reader  = new FileReader();
          reader.onloadend = function(evt) {

              
            preview = evt.target.result;
            console.log(preview)
            $rootScope.getfileData = preview;

            $scope.getfile.push({
              "file": filoename.files[0].name,
              "format": $rootScope.getfileData
            })

             
          };
          if (filoename.files[0]) {  
            reader.readAsDataURL(filoename.files[0]); 
          }
        } else {
          $scope.getfile = [];
          $scope.filoename = "";
          /*document.getElementById("uploadFile").reset();*/
          $scope.image = {};
          alert("Selected file is too big")
            /*document.getElementById("uploadFile").value = "";*/
            /*$scope.$apply();*/
            /*function clearFileInput(id) 
            { 
                var oldInput = document.getElementById(id); 
        
                var newInput = document.createElement("input"); 
        
                newInput.type = "file"; 
                newInput.id = oldInput.id; 
                newInput.name = oldInput.name; 
                newInput.className = oldInput.className; 
                newInput.style.cssText = oldInput.style.cssText; 
                // TODO: copy any other relevant attributes 
                newInput.onchange=oldInput.onchange;
                newInput.accept=oldInput.accept;
                oldInput.parentNode.replaceChild(newInput, oldInput); 
            }
            clearFileInput("uploadFile");*/

        }
      }
    }

  })
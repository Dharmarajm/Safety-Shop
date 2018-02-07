angular.module('sellerproductadd', [])
.controller('sellerproductaddCtrl', function($scope,$rootScope,$window,$stateParams, $ionicModal,$ionicHistory,$timeout,$ionicPopup,$http,$state,$ionicLoading,$cordovaImagePicker) {
 
 $scope.category1=1;
 $scope.categoryidentify=[];
 $rootScope.customerDetails=JSON.parse(localStorage.getItem("sscustomer"));
 $rootScope.authCode=localStorage.getItem("ssauthcode");
 
 $rootScope.inputs=[{
                       "spec_name": "",
                       "spec_value": "",
                       "sort_order": ""
                    }] 

 $scope.img=imageUrl;                   
 
 if(localStorage.getItem('editId')){
  $rootScope.selldata="Edit"; 
  $scope.template="Update";
  var data=JSON.parse(localStorage.getItem('editId'));
  $http.get(baseUrl+'seller/product/edit/'+data.id,{headers:{ "Authorization": 'Bearer' +$rootScope.authCode }
   }).then(function(res){
      $scope.proEdit=res.data[0];
               console.log($scope.proEdit)

               $scope.proadd ={ 
                                "prodCategory1": $scope.proEdit.product.category_ids[0],
                                "prodCategory2": $scope.proEdit.product.category_ids[1],
                                "prodCategory3": $scope.proEdit.product.category_ids[2],
                                "productcategory": $scope.proEdit.product.type_id,
                                "ProName": $scope.proEdit.product.name,
                                "sku":$scope.proEdit.product.sku,
                                "price":Math.round($scope.proEdit.product.price),
                                "quantity":$scope.proEdit.product.quantity_and_stock_status.qty,
                                "stockState":$scope.proEdit.product.quantity_and_stock_status.is_in_stock,
                                "describe":$scope.proEdit.product.description,
                                "shortdescribe":$scope.proEdit.product.short_description
                               }
                              
                              for(var i in $scope.proEdit.custom_spec){
                                $rootScope.inputs.splice(0,1);
                                $scope.item = {
                                               "spec_name":$scope.proEdit.custom_spec[i].spec_name,
                                               "spec_value":$scope.proEdit.custom_spec[i].spec_value,
                                               "sort_order":Math.round($scope.proEdit.custom_spec[i].sort_order)
                                              }           
                                $rootScope.inputs.push($scope.item)
                              }
                              
                              /*$scope.images=$scope.proEdit.product.media_gallery.images;*/
                              $scope.showaddimage=[];
                              $scope.showmainimg=[];

                              if($scope.proEdit.product.media_gallery.images!=0){
                                
                                $scope.checkimg=$scope.proEdit.product.image;
                                for(var i in $scope.proEdit.product.media_gallery.images){
                                   $scope.checkimg2=$scope.proEdit.product.media_gallery.images[i].file;
                                     if($scope.checkimg!=$scope.checkimg2){
                                      $scope.showaddimage.push({"file":$scope.proEdit.product.media_gallery.images[i].file,"id":$scope.proEdit.product.media_gallery.images[i].value_id})
                                      console.log($scope.showaddimage)
                                     }else if($scope.checkimg==$scope.checkimg2){
                                       $scope.showmainimg.push({"file":$scope.proEdit.product.media_gallery.images[i].file,"id":$scope.proEdit.product.media_gallery.images[i].value_id})
                                     }
                                }
                              }else{
                                $scope.showaddimage=[];
                                $scope.showmainimg=[];
                              }

                              /*if($scope.proEdit.product.image!=undefined){
                                  $scope.showmainimg=[$scope.proEdit.product.image];
                                  console.log($scope.showmainimg)
                              }else{
                                $scope.showmainimg=[];
                              }*/
                              
                              if($scope.proEdit.custom_spec==null){
                                $rootScope.inputs=[];
                              }

                              $http.get(baseUrl+'seller/subcategory/'+$scope.proEdit.product.category_ids[0],{ headers: { "Authorization": 'Bearer '+$rootScope.authCode } 
                               }).then(function(res){
                                   $rootScope.rootCat1=res.data[0].sub_categories;
                                 })
                              $http.get(baseUrl+'seller/subcategory/'+$scope.proEdit.product.category_ids[1],{ headers: { "Authorization": 'Bearer '+$rootScope.authCode } 
                               }).then(function(res){
                                   $rootScope.rootCat2=res.data[0].sub_categories;
                                 })
                               $http.get(baseUrl+'seller/subcategory/'+$scope.proEdit.product.category_ids[2],{ headers: { "Authorization": 'Bearer '+$rootScope.authCode } 
                               }).then(function(res){
                                   $rootScope.rootCat3=res.data[0].sub_categories;
                                 })   
                              


    })
 }else{
       $rootScope.selldata="Add";
       $scope.template="Add";
      }
 

  $http.get(baseUrl+'seller/subcategory/2',{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
   }).then(function(res){
    $rootScope.rootCat=res.data[0].sub_categories;
  })
 
 $scope.category=function(id){
  if($rootScope.selldata!='Edit'){
   for(var i in $scope.categoryidentify){
    if($scope.categoryidentify[i].id==id){ 
     $scope.category1=id;     
    }
   }
   if(id==1){
    $scope.category1=id;
   }  
  }
  if($rootScope.selldata!='Add'){
    $scope.category1=id;
  }  
 } 

  $scope.categoryCheck=function(id){
   if($rootScope.selldata!='Edit'){
     $scope.categoryidentify.push({"id":id})
     return $scope.category(id); 
   }
   if($rootScope.selldata!='Add'){
     $scope.category(id);
   } 
  }

 
  $rootScope.getCategory=[];
  if(localStorage.getItem('editId')==null){
   $scope.proadd={"prodCategory1":"","prodCategory2":"","prodCategory3":""};
  } 

 $scope.rootcat=function(id){
  if(id!=null || id!=undefined || id!=''){
    $rootScope.getCategory=[];
    $http.get(baseUrl+'seller/subcategory/'+id,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode } 
     }).then(function(res){
         $rootScope.rootCat1=res.data[0].sub_categories;
         $rootScope.getCategory.push(id);
         $scope.proadd.prodCategory2="";
         $scope.proadd.prodCategory3="";
         console.log($rootScope.getCategory) 
         /*console.log($rootScope.rootCat2)
         console.log($rootScope.rootCat1=='')
         console.log($rootScope.rootCat1!=null)
         console.log($rootScope.rootCat1.value=='')
         console.log($rootScope.rootCat1.length==0)
         console.log($rootScope.rootCat1==undefined)
         console.log($rootScope.rootCat1==null)
         console.log($scope.proadd.prodCategory1==undefined)
         console.log($scope.proadd.prodCategory2==undefined)
         console.log($scope.proadd.prodCategory2==null)  */
       })
  }
  if(id==null || id=='' || id==undefined){
    $rootScope.getCategory=[];
    $rootScope.rootCat2=""
    $rootScope.rootCat3="";
    console.log($rootScope.getCategory) 
  }
 }

 $scope.subcat1=function(id){
  if(id!=null || id!=undefined || id!=''){
    $http.get(baseUrl+'seller/subcategory/'+id,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
     }).then(function(res){
         $rootScope.rootCat2=res.data[0].sub_categories;
         $rootScope.getCategory.length=1;
         $rootScope.getCategory.push(id);
         $scope.proadd.prodCategory3='';
         console.log($rootScope.getCategory) 
         /*console.log($rootScope.rootCat2)
         console.log($rootScope.rootCat2=='')
         console.log($rootScope.rootCat2.length==0)
         console.log($rootScope.rootCat2==undefined)
         console.log($rootScope.rootCat2==null)
         console.log($scope.proadd.prodCategory2==undefined)
         console.log($scope.proadd.prodCategory1==undefined)
         console.log($scope.proadd.prodCategory2=='')*/
       })
  }
  if(id==null || id=='' || id==undefined){
    $rootScope.getCategory.length=1;
    console.log($rootScope.getCategory)
  }
 }

 $scope.subcat2=function(id){
  if(id!=null || id!=undefined || id!=''){
    $http.get(baseUrl+'seller/subcategory/'+id,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
     }).then(function(res){
        $rootScope.rootCat3=res.data[0].sub_categories;
        $rootScope.getCategory.length=2;
        $rootScope.getCategory.push(id);
        console.log($rootScope.getCategory)  
       })
  }
  if(id==null || id=='' || id==undefined){
    $rootScope.getCategory.length=2;
    /*$rootScope.getCategory.splice(1,3);*/
    console.log($rootScope.getCategory)
  }
 }
  
 $scope.productconfig=[{'id':1,'name':'Simple Product','value':'simple'},{'id':2,'name':'Configurable Product','value':'configurable'}]; 
 
 $scope.stockState1=[{'id':1,'name':'In Stock','value':true},{'id':2,'name':'Out of Stock','value':false}];

   
  $scope.addfield=function(){
    /*var addNo=$rootScope.inputs.length + 1;*/
    $rootScope.inputs.push({
                              "spec_name": "",
                              "spec_value": "",
                              "sort_order": ""
                          })
  }  
  
 $scope.add=function(addval){
   console.log(addval)
   $rootScope.addspec=addval;
   return $scope.categoryCheck(4);
 } 

 $scope.spectdel=function(index){
  $rootScope.inputs.splice(index,1);
 
 }
 
 $scope.datas=[];

$scope.productdetailsadd=function(detail,spec){
  
  if($scope.proadd.prodCategory1!=null || $scope.proadd.prodCategory1!=undefined || $scope.proadd.prodCategory1!=""){
    $scope.datas.length=0;
    $scope.datas.push($scope.proadd.prodCategory1)
  }
  if($scope.proadd.prodCategory2!=null || $scope.proadd.prodCategory2!=undefined || $scope.proadd.prodCategory2!=""){
    $scope.datas.length=1;
    $scope.datas.push($scope.proadd.prodCategory2)
  }
  if($scope.proadd.prodCategory3!=null || $scope.proadd.prodCategory3!=undefined || $scope.proadd.prodCategory3!=""){
    $scope.datas.length=2;
    $scope.datas.push($scope.proadd.prodCategory3)
  }

  if($scope.proadd.prodCategory3==undefined || $scope.proadd.prodCategory3==null || $scope.proadd.prodCategory3==""){
    $scope.datas.length=2;
  }
 
  console.log($scope.uploadimageAddition)
  console.log($scope.uploadimageMain)
  if($rootScope.selldata=="Add"){
     
      if($scope.uploadimageMain.length==0){
         $scope.uploadimageMain.push({file:"",format:""})
       }else if($scope.uploadimageMain.length!=0){
         if($scope.uploadimageMain[0].format=="" || $scope.uploadimageMain[0].format==undefined || $scope.uploadimageMain[0].format==null){
            $scope.uploadimageMain[0].format=""
          }
          if($scope.uploadimageMain[0].file=="" || $scope.uploadimageMain[0].file==undefined || $scope.uploadimageMain[0].file==null){
            $scope.uploadimageMain[0].file=""
          }     
       }else{

       }

     $scope.getalladdition=[];

     if($scope.uploadimageAddition.length!=0){
        for(var i=0;i<$scope.uploadimageAddition.length;i++){
          $scope.getalladdition.push({"file": $scope.uploadimageAddition[i].format,
                                      "name": $scope.uploadimageAddition[i].file
                                     })      
       }
     }
       
    console.log($scope.getalladdition)

    var data={
            "product": {
              "id": 0,
              "sku": detail.sku,
              "name": detail.ProName,
              "type_id":detail.productcategory ,
              "status":"1",
              "price": detail.price,
              "stock_status": detail.stockState,
              "qty": detail.quantity,
              "description": detail.describe,
              "short_description": detail.shortdescribe,
              "category_ids": $rootScope.getCategory,
              "customspec": $rootScope.addspec,
              "main_image": {
                 "file": $scope.uploadimageMain[0].format,
                 "name": $scope.uploadimageMain[0].file
               },
               "additional_images": $scope.getalladdition
             },
            "type": "new",
            "id": 0,
            "seller_id": $rootScope.customerDetails.id
           } 
    console.log(data)
    $http.put(baseUrl+'seller/product/save',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
     }).then(function onSuccess(response) {
        if(response.data[0].status.msg){

         $ionicPopup.alert({
                               title: 'Customer Details',
                               template: 'Your Product Added Successfully',
                               buttons: [
                               {
                                  text: '<b>OK</b>',
                                  type: 'button-positive',
                                  onTap: function() {
                                   
                                    /*$rootScope.getCategory="";
                                    $rootScope.addspec="";
                                    $rootScope.rootCat1=""
                                    $rootScope.rootCat2=""
                                    $rootScope.rootCat3="";*/
                                    return;
                                  }
                                }]
                               })
                             }
       }, function onError(response) {
              $ionicPopup.alert({
                               title: 'Customer Details',
                               template: 'Failed to connect the server',
                               buttons: [
                               {
                                  text: '<b>OK</b>',
                                  type: 'button-positive',
                                  onTap: function() {
                                   return;
                                  }
                                }]
                               })
       })   
  }

  
  
  if($rootScope.selldata=="Edit"){
     
    /*if($scope.showmainimg.length!=0){
      $scope.uploadimageMain.push({file:"",format:""})      
    }else{*/
      if($scope.uploadimageMain.length==0){
       
       $scope.uploadimageMain.push({file:"",format:""})
      }else if($scope.uploadimageMain.length!=0){
       if($scope.uploadimageMain[0].format=="" || $scope.uploadimageMain[0].format==undefined || $scope.uploadimageMain[0].format==null){
          $scope.uploadimageMain[0].format=""
        }
        if($scope.uploadimageMain[0].file=="" || $scope.uploadimageMain[0].file==undefined || $scope.uploadimageMain[0].file==null){
          $scope.uploadimageMain[0].file=""
        }     
      }else{
       } 
      /*}*/

     $scope.getalladdition=[];
     
     /*if($scope.showaddimage.length!=0){
         $scope.arraylength=[];
         for(var i=0;i<$scope.showaddimage.length;i++){
           $scope.arraylength.push(i);
           console.log($scope.arraylength)
         }
         var arraylength=$scope.arraylength;
         angular.forEach(arraylength, function(value) {
           $scope.uploadimageAddition.push({"file":'',"name":''})              
         });
         console.log($scope.uploadimageAddition)
     }*/

     if($scope.uploadimageAddition.length!=0){
        for(var i=0;i<$scope.uploadimageAddition.length;i++){
          $scope.getalladdition.push({"file": $scope.uploadimageAddition[i].format,
                                       "name": $scope.uploadimageAddition[i].file
                                     })      
       }
      }
      console.log($scope.getalladdition)
    var data={
            "product": {
              "id": $scope.proEdit.product.entity_id,
              "sku": detail.sku,
              "name": detail.ProName,
              "type_id":detail.productcategory,
              "status":"1",
              "price": detail.price,
              "stock_status": detail.stockState,
              "qty": detail.quantity,
              "description": detail.describe,
              "short_description": detail.shortdescribe,
              "category_ids": $scope.datas,
              "customspec": $rootScope.inputs,
              "main_image": {
                 "file": $scope.uploadimageMain[0].format,
                 "name": $scope.uploadimageMain[0].file
               },
               "additional_images": $scope.getalladdition
             },
            "type": "edit",
            "id": $scope.proEdit.product.entity_id,
            "seller_id": $rootScope.customerDetails.id
           } 
    console.log(data)
    $http.put(baseUrl+'seller/product/save',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
     }).then(function onSuccess(response) {
       if(response.data[0].status.msg){
        
         $ionicPopup.alert({
                               title: 'Customer Details',
                               template: 'Your Product updated Successfully',
                               buttons: [
                               {
                                  text: '<b>OK</b>',
                                  type: 'button-positive',
                                  onTap: function() {
                                   
                                    // $rootScope.getCategory="";
                                    // $rootScope.addspec="";
                                    // $rootScope.rootCat1=""
                                    // $rootScope.rootCat2=""
                                    // $rootScope.rootCat3="";
                                    return;
                                  }
                                }]
                          })
               }
       }, function onError(error) {
       
         $ionicPopup.alert({
                               title: 'Customer Details',
                               template: 'Failed to Connect the Server',
                               buttons: [
                               {
                                  text: '<b>OK</b>',
                                  type: 'button-positive',
                                  onTap: function() {
                                   return;
                                  }
                                }]
                               })
                      
       })
  }
  
 }
 

 $scope.uploadimageMain=[];
 $scope.uploadmainfile=[]; 

 $scope.upload = function(){
  if($scope.selldata=='Add' || $scope.showmainimg.length==0){
     
     $scope.uploadimageMain=[];
     $scope.uploadmainfile=[];
    

    var options = {
     maximumImagesCount: 1,
     width: 800,
     height: 800,
     quality: 80
    };
 
  $cordovaImagePicker.getPictures(options)
    .then(function (results) {
        $scope.uploadmainfile=[];
        /*console.log('Image URI: ' + results[0]);*/
        if(results[0]!=undefined){
         $scope.uploadmainfile.push({"file":results[0]})  
        }
        window.resolveLocalFileSystemURL(results[0],
            function (fileEntry) {
                // convert to Base64 string
                 $scope.uploadimageMain.length=0;
                fileEntry.file(
                    function(file) {
                        //got file
                        
                        var reader = new FileReader();
                        reader.onloadend = function (evt) {
                            var imgData = evt.target.result; // this is your Base64 string
                            /*$scope.uploadimageMain.push({"file":results[0].file,"format":imgData});*/
                            $rootScope.getimgData=imgData
                        };
                        reader.readAsDataURL(file);

                        $scope.uploadimageMain.push({"file":file.name,"format":$rootScope.getimgData})
                    }, 
                function (evt) { 
                    //failed to get file
                });

            },
            // error callback
            function () { }
        )
      console.log($scope.uploadimageMain)    
    }, function(error) {
      // error getting photos
      alert(error);
    }) 
  }else{
    alert("Please Delete the Main Image Before add");
  }
 }

 

 $scope.uploadimageAddition=[];
 $scope.uploadaddfile=[];

 $scope.upload1 = function(){
  if($scope.selldata=='Add' || $scope.showaddimage.length<=4){
    $scope.countImg=5;
    if($scope.showaddimage!=undefined || $scope.showaddimage!=null){
      $scope.countImg=5-$scope.showaddimage.length
    }

    $scope.uploadimageAddition=[];
    $scope.uploadaddfile=[];

    var options = {
     maximumImagesCount: $scope.countImg,
     width: 800,
     height: 800,
     quality: 80
    };
    
   console.log(options)

  $cordovaImagePicker.getPictures(options)
    .then(function (results) {
      
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
              
           $scope.uploadaddfile.push({"file":results[i]})
           window.resolveLocalFileSystemURL(results[i],
            function (fileEntry) {
                // convert to Base64 string
                 
                fileEntry.file(
                    function(file) {
                        //got file
                        var reader = new FileReader();
                        reader.onloadend = function (evt) {
                            var imgData = evt.target.result; // this is your Base64 string
                            $rootScope.imgpickData=imgData;
                        };
                        reader.readAsDataURL(file);

                        $scope.uploadimageAddition.push({"file":file.name,"format":$rootScope.imgpickData})
                      
                    }, 
                function (evt) { 
                    //failed to get file
                });
            },
            // error callback
            function () { }
        )
      
       
      }
      console.log($scope.uploadimageAddition)
    }, function(error) {
      // error getting photos
      alert(error);
    })
  }else{
    alert("Please delete some images before add");
  }  
 }

 $scope.imgDelete=function(id){
    var data={
               "image_id": id,
               "product_id": $scope.proEdit.product.entity_id,
               "seller_id": $rootScope.customerDetails.id
             }
        console.log(data)     
     $http.post(baseUrl+'seller/product/imagedelete',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
     }).then(function(response){
     console.log(response)                     
       if(response.data[0].msg){
        $ionicPopup.alert({
                               title: 'Product Image Delete',
                               template: 'Your Product Image deleted Successfully',
                               buttons: [
                               {
                                  text: '<b>OK</b>',
                                  type: 'button-positive',
                                  onTap: function() {
                                    if($scope.showmainimg!=null){
                                     if($scope.showmainimg[0].id==id){
                                      $scope.showmainimg.splice($scope.showmainimg.indexOf(id),1)   
                                     } 
                                    } 
                                    if($scope.showaddimage!=null){
                                      for(var i in $scope.showaddimage){
                                        if($scope.showaddimage[i].id==id){
                                          $scope.showaddimage.splice($scope.showaddimage.indexOf(id),1)
                                        }
                                      }  
                                    }
                                    return true;
                                  }
                                }]
        })
       
       } 
       },function(error){
         $ionicPopup.alert({
                               title: 'Product Image Delete',
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
 }

})
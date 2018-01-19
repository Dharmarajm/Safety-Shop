angular.module('sellerproductadd', [])
.controller('sellerproductaddCtrl', function($scope,$rootScope,$window,$stateParams, $ionicModal,$ionicHistory,$timeout,$ionicPopup,$http,$state,$ionicLoading,$cordovaFileTransfer,$cordovaImagePicker) {
 
 $scope.category1=1;
 $scope.categoryidentify=[];
 
 $rootScope.inputs=[{
                       "spec_name": "",
                       "spec_value": "",
                       "sort_order": ""
                    }] 

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
                                "price":$scope.proEdit.product.price,
                                "quantity":$scope.proEdit.product.quantity_and_stock_status.qty,
                                "stockState":$scope.proEdit.product.quantity_and_stock_status.is_in_stock,
                                "describe":$scope.proEdit.product.description,
                                "shortdescribe":$scope.proEdit.product.short_description
                               }
                              
                              for(var i in $scope.proEdit.custom_spec){
                                $rootScope.inputs.push($scope.proEdit.custom_spec[i])
                                $rootScope.inputs.splice(0,1);
                                $scope.item = {
                                               "spec_name":$scope.proEdit.custom_spec[i].spec_name,
                                               "spec_value":$scope.proEdit.custom_spec[i].spec_value,
                                               "sort_order":$scope.proEdit.custom_spec[i].sort_order
                                              }           
                              }
                              if($scope.proEdit.custom_spec==null){
                                $rootScope.inputs=[];
                              }

                              $http.get(baseUrl+'seller/subcategory/'+$scope.proEdit.product.category_ids[0],{ headers: { "Authorization": 'Bearer '+$rootScope.authCode } 
                               }).then(function(res){
                                   $rootScope.rootCat1=res.data[0].sub_categories;
                                   console.log($rootScope.rootCat1)
                                 })
                              $http.get(baseUrl+'seller/subcategory/'+$scope.proEdit.product.category_ids[1],{ headers: { "Authorization": 'Bearer '+$rootScope.authCode } 
                               }).then(function(res){
                                   $rootScope.rootCat2=res.data[0].sub_categories;
                                   console.log($rootScope.rootCat2.length)
                                 })
                               $http.get(baseUrl+'seller/subcategory/'+$scope.proEdit.product.category_ids[2],{ headers: { "Authorization": 'Bearer '+$rootScope.authCode } 
                               }).then(function(res){
                                   $rootScope.rootCat3=res.data[0].sub_categories;
                                   console.log($rootScope.rootCat3)
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
  if(id!=null || id!=undefined){
    $rootScope.getCategory=[];
    $http.get(baseUrl+'seller/subcategory/'+id,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode } 
     }).then(function(res){
         $rootScope.rootCat1=res.data[0].sub_categories;
         $rootScope.getCategory.push(id);
         $scope.proadd.prodCategory2="";
         $scope.proadd.prodCategory3="";
         /*console.log($scope.rootCat1)
         console.log($rootScope.getCategory)*/
          console.log($rootScope.rootCat2)
         console.log($rootScope.rootCat1=='')
         console.log($rootScope.rootCat1!=null)
         console.log($rootScope.rootCat1.value=='')
         console.log($rootScope.rootCat1.length==0)
         console.log($rootScope.rootCat1==undefined)
         console.log($rootScope.rootCat1==null)
         console.log($scope.proadd.prodCategory1==undefined)
         console.log($scope.proadd.prodCategory2==undefined)
         console.log($scope.proadd.prodCategory2==null)  
       })
  }
  if(id==null || id==''){
    $rootScope.getCategory=[];
    $rootScope.rootCat2=""
    $rootScope.rootCat3="";
  }
 }

 $scope.subcat1=function(id){
  if(id!=null || id!=undefined){
    $http.get(baseUrl+'seller/subcategory/'+id,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
     }).then(function(res){
 	       $rootScope.rootCat2=res.data[0].sub_categories;
         $rootScope.getCategory.push(id);
         $scope.proadd.prodCategory3='';
 	       console.log($rootScope.rootCat2)
         console.log($rootScope.rootCat2=='')
         console.log($rootScope.rootCat2.length==0)
         console.log($rootScope.rootCat2==undefined)
         console.log($rootScope.rootCat2==null)
         console.log($scope.proadd.prodCategory2==undefined)
         console.log($scope.proadd.prodCategory1==undefined)
         console.log($scope.proadd.prodCategory2=='')
       })
  }
  if(id==null || id==''){
    $rootScope.getCategory.splice(1,2);
    console.log($rootScope.getCategory)
  }
 }

 $scope.subcat2=function(id){
  if(id!=null || id!=undefined){
    console.log(id)
    $http.get(baseUrl+'seller/subcategory/'+id,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
     }).then(function(res){
        $rootScope.rootCat3=res.data[0].sub_categories;
        $rootScope.getCategory.push(id);
        console.log($scope.rootCat3)
        console.log($rootScope.getCategory)  
       })
  }
  if(id==null || id==''){
    $rootScope.getCategory.splice(2,$rootScope.getCategory.length);
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
    console.log($scope.inputs);
  }  
  
 $scope.add=function(addval){
   $rootScope.addspec=addval;
   return $scope.categoryCheck(4);
 } 

 $scope.spectdel=function(index){
  console.log(index)
  $rootScope.inputs.splice(index,1);
 
 }

 $scope.productdetailsadd=function(detail,spec){

  var data={
            "product": {
              "id": 0,
              "sku": detail.sku,
              "name": detail.ProName,
              "type_id":detail.productcategory ,
              "status":"1" ,
              "price": detail.price,
              "stock_status": detail.stockState,
              "qty": detail.quantity,
              "description": detail.describe,
              "short_description": detail.shortdescribe,
              "category_ids": $rootScope.getCategory,
              "customspec": $rootScope.addspec,
              "main_image": {
                 "file": "",
                 "name": ""
               },
               "additional_images": [ {"file": "{{base 64 format}}",
                                       "name": "{{filename}}",
                                       "delete": 0
                                     } ]
             },
            "type": "new",
            "id": 0,
            "seller_id": 2
           } 
      console.log(data);    

  $http.put(baseUrl+'seller/product/save',data,{ headers: { "Authorization": 'Bearer '+$rootScope.authCode }
   }).then(function(res){
      $rootScope.productSave=res.data;
      $rootScope.getCategory="";
      $rootScope.addspec="";
      $rootScope.rootCat1=""
      $rootScope.rootCat2=""
      $rootScope.rootCat3="";
     })
 }
 

 $scope.uploadimage=[];

 $scope.upload = function(){

  var options = {
   maximumImagesCount: 1,
   width: 800,
   height: 800,
   quality: 80
  };

  $cordovaImagePicker.getPictures(options)
    .then(function (results) {
      
        console.log('Image URI: ' + results[0]);
        alert(results[0]);
        $scope.img = results[0];
        $scope.uploadimage.push($scope.img)
    }, function(error) {
      // error getting photos
      alert(error);
    })
}

$scope.upload1 = function(){

  var options = {
   maximumImagesCount: 1,
   width: 800,
   height: 800,
   quality: 80
  };

  $cordovaImagePicker.getPictures(options)
    .then(function (results) {
      
        console.log('Image URI: ' + results[0]);
        alert(results[0]);
        $scope.img = results[0];
        $scope.uploadimage.push($scope.img)
    }, function(error) {
      // error getting photos
      alert(error);
    })
}

$scope.upload2 = function(){

  var options = {
   maximumImagesCount: 1,
   width: 800,
   height: 800,
   quality: 80
  };

  $cordovaImagePicker.getPictures(options)
    .then(function (results) {
      
        console.log('Image URI: ' + results[0]);
        alert(results[0]);
        $scope.img = results[0];
        $scope.uploadimage.push($scope.img)
        alert($scope.uploadimage)
    }, function(error) {
      // error getting photos
      alert(error);
    })
}

/*
  // Destination URL 
//var url = "http://192.168.1.74:3000/users/image";
 
//File for Upload
var targetPath = $scope.img;
 
// File name only
var filename = targetPath.split("/").pop();
 
var options = {
     fileKey: "file",
     fileName: filename,
     chunkedMode: false,
     mimeType: "image/jpg",
 params : {'directory':'upload', 'fileName':filename} // directory represents remote directory,  fileName represents final remote file name
 };
      alert("ff");
 $cordovaFileTransfer.upload(baseUrl, targetPath, options).then(function (result) {
     console.log("SUCCESS: " + JSON.stringify(result.response));
        alert("sucess");
       alert(result.response);
 }, function (err) {
        alert("error");
     console.log("ERROR: " + JSON.stringify(err));
     alert(err);
 }, function (progress) {
     // PROGRESS HANDLING GOES HERE
 })

}*/


/*$scope.data = { "ImageURI" :  "Select Image" };

        function UploadPicture(imageURI) {

            $scope.data.ImageURI =  imageURI;
            alert($scope.data.ImageURI );
        }

        $scope.ShowPictures = function(){
            navigator.camera.getPicture(UploadPicture, function(message) {
                    alert('get picture failed');
                    },{
                    quality: 50,
                    destinationType: navigator.camera.DestinationType.FILE_URI,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                }
            );
        };*/
})
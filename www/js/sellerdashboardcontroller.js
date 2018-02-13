angular.module('sellerDashboard', ['ionic'])
  .controller('sellerdashboardCtrl', function($scope, $rootScope, $window, $ionicModal, $timeout, $ionicPopup, $http, $state, $ionicLoading, $cordovaFileTransfer, $cordovaImagePicker, $filter) {

    $rootScope.customerDetails = JSON.parse(localStorage.getItem("sscustomer"));
    $scope.selldbcode = function() {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      $http.get(baseUrl + 'seller/dashboard/' + $rootScope.customerDetails.id, {
        headers: {
          "Authorization": 'Bearer ' + $rootScope.authCode
        }
      }).then(function(response) {
        $rootScope.selldashboard = response.data[0];
        console.log($rootScope.selldashboard)
        console.log($rootScope.selldashboard.enquiry_percentage)
        $scope.barCkey = [];
        $scope.barCvalue = [];

        for (var key in $rootScope.selldashboard.enquiry_by_month) {
          $scope.barCkey.push(key)
          console.log($scope.barCkey);

          $scope.barCvalue.push($rootScope.selldashboard.enquiry_by_month[key]);
          console.log($scope.barCvalue);
        }

        $scope.pielabels = ["Total Enquiries", "Remaining Categories"];
        $scope.piedata = [$rootScope.selldashboard.enquiry_percentage, 100 - $rootScope.selldashboard.enquiry_percentage];

        $scope.labelsbar = $scope.barCkey;
        $scope.seriesbar = ['Top Performing Categories'];

        $scope.databar = $scope.barCvalue;
        $timeout(function() {
          $ionicLoading.hide();
        });
      })
    }


    /*$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.series = ['Series A'];

    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40]
    ];*/

    /*var PIECHART = document.getElementById('pie');
    var myPieChart = new Chart(PIECHART, {
        type: 'doughnut',
        options: {
            cutoutPercentage: 90,
            legend: {
                display: true
            }
        },
        data: {
            labels: [
                "Completed",
                "Total",
            ],
            datasets: [
                {
                    data: [180, 200],
                    borderWidth: [0, 0],
                    backgroundColor: [
                        '#b1b2b5',
                        "#f4f4f4",
                            ],
                    hoverBackgroundColor: [
                        '#ec6e17',
                        "#ec6e17",
                     ]
                }]
        }
    });
  */
  })
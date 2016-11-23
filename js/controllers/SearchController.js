app.controller('SearchCtrl', function($scope, $state, SearchService,
  IssuesService, $mdDialog) {
  $scope.searchUrl = "";
  var noIssues = "No issues";
  var noIssuesDesc = "No issues opened ";
  var url = "";

  $scope.formData = {
    today: [],
    thisWeek: [],
    prev: [],
    total: 0
  };

  $scope.search = function() {
    $scope.formData = {
      today: [],
      thisWeek: [],
      prev: [],
      total: 0
    };

    url = SearchService.getRepoName($scope.searchUrl);
    if (url === "") {
      showAlert("popupContainer", "Validation Failed",
        "Invalid URL for a GitHub repository",
        $mdDialog);
      return;
    }

    var page = 1;
    var date = new Date();

    //Progress bar in motion until the promise returns
    $scope.promise = SearchService.getIssues(url, page, 0, [], [], [],
        date)
      .then(function(data) {
        $scope.formData = {
          today: data.today,
          thisWeek: data.thisWeek,
          prev: data.prev,
          total: data.total
        };
      }, function(data) {
        showAlert("popupContainer", "Validation failed",
          "Invalid URL for a GitHub repository",
          $mdDialog);
      });
  };

  //displays the different open issues in a different screen,
  //differentiated based on when it was opened.
  $scope.listIssues = function(when) {
    var date = new Date();
    var date_in_ms = date.getTime();
    var q = "";
    var title = url + " - ";
    var data;
    if (when === "today") {
      if ($scope.formData.today.length === 0) {
        showAlert("popupContainer", noIssues, noIssuesDesc +
          " in the last 24 hours.", $mdDialog);
        return;
      }
      data = $scope.formData.today;
      title += "Issues opened < 24 hours ago";
    } else if (when == "thisWeek") {
      if ($scope.formData.thisWeek === 0) {
        showAlert("popupContainer", noIssues, noIssuesDesc +
          " in the past week!", $mdDialog);
        return;
      }
      data = $scope.formData.thisWeek;
      title +=
        "Issues opened > 24 hours ago but < 7 days ago";
    } else if (when == "prev") {
      if ($scope.formData.prev === 0) {
        showAlert("popupContainer", noIssues, noIssuesDesc +
          " from the week before last!", $mdDialog);
        return;
      }
      data = $scope.formData.prev;
      title += "Issues opened > 7 days ago";
    } else {
      title += "Open Issues";
      data = $scope.formData.today.concat($scope.formData.thisWeek).concat(
        $scope.formData.prev);
    }
    if ($scope.formData.total === 0) {
      showAlert("popupContainer", noIssues, noIssuesDesc,
        $mdDialog);
      return;
    }
    IssuesService.setData(data, title);
    //Store the URL in session strorage
    //User doesn't have to run the query again
    sessionStorage.searchUrl = url;
    $state.go('issues');
  };

  //If page is refreshed, fetch and update the data
  if (sessionStorage.searchUrl) {
    $scope.searchUrl = sessionStorage.searchUrl;
    $scope.search();
  }
});

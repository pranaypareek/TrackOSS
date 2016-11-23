app.controller('IssuesCtrl', function($scope, $state, IssuesService, $mdDialog,
  $window) {
  $scope.query = {
    limit: 100,
    page: 1
  };

  $scope.issues = IssuesService.listIssues();
  $scope.title = IssuesService.getTitle();

  $scope.getDate = function(date) {
    return new Date(date).toDateString();
  };

  $scope.getAssignedTo = function(assignee) {
    if (assignee === null)
      return "";
    return assignee.login;
  };

  $scope.issueDescribe = function(title, description) {
    showAlert("issuePage", title, description, $mdDialog);
  };

  $scope.openInNewTab = function(url) {
    if (url === "")
      return;
    $window.open(url, '_blank');
  };

  $scope.getAssigneeUrl = function(assignee) {
    if (assignee === null)
      return "";
    return assignee.html_url;
  };

  $scope.getAssigneeAvatar = function(assignee) {
    if (assignee === null)
      return "";
    return assignee.avatar_url;
  };
});

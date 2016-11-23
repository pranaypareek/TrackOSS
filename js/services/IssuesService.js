app.service('IssuesService', function($http, $q) {
  var issues = [];
  var title = "";
  return {
    setData: function(d, t) {
      issues = d;
      title = t;
    },
    getTitle: function() {
      return title;
    },
    listIssues: function() {
      return issues;
    }
  };
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('search', {
      url: '/search',
      templateUrl: '/html/search.html',
      controller: 'SearchCtrl'
    })
    .state('issues', {
      url: '/issues',
      templateUrl: '/html/issues.html',
      controller: 'IssuesCtrl'
    });

  $urlRouterProvider.otherwise('/search');
});

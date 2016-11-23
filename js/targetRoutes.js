/*
  GitHub API
  
  https://developer.github.com/v3/repos/

  The call below fetches 100 items per page sorted with most recenlty opened
  issues at the beginning.

  eg. https://api.github.com/repos/docker/docker/issues1&
    since=2016-04-13T09:00:00.000Z;
*/

var url = "https://api.github.com/repos/";
var params = "?direction=desc&sort=updated&per_page=100&state=open&page=";

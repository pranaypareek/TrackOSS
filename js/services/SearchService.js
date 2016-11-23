app.service('SearchService', function($http, $q) {
  return {
    //Fetching issues for given repo and arranging them by time perio
    //into different lists: total, thisWeek, prev
    getIssues: function(repo, pageNo, total, today, thisWeek, prev, date) {
      var self = this;
      var repository = repo + "/issues";
      return $http.get(url + repository + params + pageNo)
        .then(function(response) {
          var flag = true;
          var data = {};

          if (typeof response.data === 'object') {
            if (response.data.length === 0) {
              data = {
                total: total,
                thisWeek: thisWeek,
                today: today,
                prev: prev
              };
              return data;
            }

            total += response.data.length;
            for (var i = 0; i < response.data.length; i++) {
              var openedDate = new Date(response.data[i].updated_at);
              if (date - openedDate <= 86400000) {
                //Was the issue opened in the past 24 hours?
                today.push(response.data[i]);
              } else if (((date - openedDate) > 86400000) && ((date -
                  openedDate) < 604800000)) {
                //Was the issue opened this week?
                thisWeek.push(response.data[i]);
              } else {
                //Was the issue opened the week for the last?
                prev.push(response.data[i]);
              }
            }

            //Pass data back to controller if no more issues to fetch
            if (response.data.length < 100) {
              data = {
                total: total,
                thisWeek: thisWeek,
                today: today,
                prev: prev
              };
              return data;
            } else {
              //Paginate if there are more issues to fetch
              return self.getIssues(repo, ++pageNo, total, today,
                thisWeek, prev, date);
            }
          } else {
            return $q.reject(response.data);
          }

        }, function(response) {
          return $q.reject(response.data);
        });
    },
    //checks whether the entered repository is valid or not
    getRepoName: function(val) {
      if (
        /(https:\/\/github.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/issues)$/
        .test(val)) {
        //eg: https://github.com/docker/docker/issues
        return val.substring(19, val.indexOf('/issues'));
      } else if (
        /(https:\/\/github.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/.test(
          val)) {
        //eg: https://github.com/docker/docker
        return val.substring(19);
      } else if (
        /(http:\/\/github.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/issues)$/
        .test(val)) {
         //eg: http://github.com/docker/docker/issues
        return val.substring(18, val.indexOf('/issues'));
      } else if (
        /(http:\/\/github.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/.test(
          val)) {
        //eg: http://github.com/docker/docker
        return val.substring(18);
      } else if (/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/issues)$/.test(val)) {
        //eg: docker/docker/issues
        return val.substring(0, val.indexOf('/issues'));
      } else if (/([A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+)$/.test(val)) {
        //eg: docker/docker
        return val;
      }
      return "";
    }
  };
});

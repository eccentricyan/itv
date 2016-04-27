var mainCtrl = function($scope, $filter, $timeout){
  $scope.questions = [

  ];
  $scope.staffs = [
    {name: 'naka', picture: 'naka.png'},
    {name: 'hiki', picture: 'hiki.png'}
  ];
  $scope.target = {
    name: 'naka',
    picture: 'naka.png',
    conversations: []
  };

  $scope.changeStaff = function(staff) {
    staff.conversations = [];
    $scope.target = staff;
    $scope.anwsers = {};
  };

  $scope.anwsers = [];
  $scope.target.conversations = [];
  $scope.sendQuestion = function() {
    if ($scope.question) {
      $scope.target.conversations.push({question: $scope.question, anwsers: ['Wow!']});
      var index = $scope.target.conversations.length - 1;
      var lastConversation = $scope.target.conversations[index];
      var anwsers = lastConversation.anwsers;
      $scope.anwsers[index] = [];
        angular.forEach(anwsers, function (anwser, i) {
          $timeout(function() {
            $scope.anwsers[index].push(anwser);
            $('html, body').animate({scrollTop: window.innerHeight}, 650, 'swing');
          }, 600, true);
        });
      }
    $scope.question = null;
  };

};

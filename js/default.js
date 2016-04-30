angular.module('interview', [])
  .controller('MainController', function($scope, $filter, $timeout, $q) {

    var vm = this;
    vm.changeStaff = changeStaff;
    vm.sendQuestion = sendQuestion;
    vm.sendQuestionWithEnter = sendQuestionWithEnter;
    active();

    function active() {
      vm.staffs = [
        {name: 'naka', picture: 'naka.png'},
        {name: 'hiki', picture: 'hiki.png'}
      ];
      vm.target = {
        name: 'naka',
        picture: 'naka.png',
        conversations: []
      };
      vm.anwsers = [];
      vm.target.conversations = [];
      vm.scrollParts = document.getElementById("interview");
    }

    function changeStaff(staff) {
      staff.conversations = [];
      vm.target = staff;
      vm.anwsers = {};
    }

    function sendQuestion() {
      if (!vm.question) return;
      vm.pending = true;
      pushToConversation(['Q', vm.question ]);
      var anwsers = ['Wow!', 'bbb'];
      scrollWithLoop(anwsers);
      vm.question = null;
    }

    function scrollWithLoop(anwsers){
      var promise = $q.all([]);
      angular.forEach(anwsers, function (anwser) {
        promise = promise.then(function(){
          return $timeout(function() {
            pushToConversation(['A', anwser]);
          }, 1000);
        });
      });
      promise.finally(function () {
        vm.pending = false;
      });
    }

    function pushToConversation(array) {
      vm.target.conversations.push(array);
      $("body").animate({scrollTop: vm.scrollParts.scrollHeight - 70}, 500, 'swing');
    }

    function sendQuestionWithEnter($event) {
      if ($event.keyCode === 13) sendQuestion();
    }

  });

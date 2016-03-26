var app = angular.module('stodo', ['LocalStorageModule', 'ngAnimate']);

app.controller('mainCtrl', function($scope, localStorageService, $timeout) {
    if (localStorageService.get('todolist')) {
        $scope.list = localStorageService.get('todolist');
    } else {
        $scope.list = [];
    }

    $scope.newTask = {};
    $scope.openModal = false;
    $scope.openNotify = false;

    $scope.$watchCollection('list', function(newValue, oldValue) {
        localStorageService.set('todolist', $scope.list);
    });

    $scope.addTask = function() {
        $scope.newTask.done = false;
        $scope.list.push($scope.newTask);
        $scope.newTask = {};
        $scope.openModal = false;
    }

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.list, function(item) {
            count += item.done ? 0 : 1;
        });

        return count;
    }

    $scope.itemsDone = 0;
    var savedItems = [];

    $scope.clearList = function() {
        var oldList = $scope.list;
        savedItems = $scope.list;

        $scope.list = [];
        $scope.notifyMsg = "";
        $scope.noDone = false;

        angular.forEach(oldList, function(item) {
            if (!item.done) {
                $scope.list.push(item);
            } else {
                $scope.itemsDone += 1;
            }
        });

        if ($scope.itemsDone > 0) {
            $scope.notifyMsg = $scope.itemsDone + " items completed";
        } else {
            $scope.notifyMsg = "There is no items completed";
            $scope.noDone = true;
        }

        $timeout(function() {
            $scope.openNotify = true;
        }, 1000);

        console.log("Todo está bien")
    }

    $scope.undo = function() {
        angular.forEach(savedItems, function(item) {
            item.done = false;
        });
        $scope.list = savedItems;
        $scope.closeNotify();
    }

    $scope.closeNotify = function() {
        $scope.openNotify = false;
        $scope.itemsDone = 0;
        savedItems = [];
    }
});

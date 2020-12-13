angular.module("myApp", [])
  .controller("firstCtrl", function($scope, $http) {

    $scope.students = [];

    $http.get('students.json').success(data => ($scope.students = data, allAvgF()));

    $scope.addNew = function() {

      if ($scope.name || $scope.surname || $scope.age || $scope.avg) {
        let tempStudent = {
          name: $scope.name,
          surname: $scope.surname,
          age: $scope.age,
          avg: $scope.avg
        };
        $scope.students.push(tempStudent);
        $scope.name = $scope.surname = $scope.age = $scope.avg = "";
      } else {
        console.log("(((((")
      }
      allAvgF();
    };


    $scope.delBut = function(index) {
      $scope.students.splice(index, 1);
      console.log($scope.students);
      allAvgF();
    };


    $scope.editBut = function(index) {

      let newAvgMark = prompt('Enter new mark');
      if (newAvgMark === null) {
        return;
      };
      newAvgMark = +newAvgMark;
      $scope.students[index]['avg'] = newAvgMark;
      console.log($scope.students);
      allAvgF();

    };

    $scope.sumBut = function(index) {
      let sum = 0;
      $scope.students.forEach(element => sum += element['avg']);
      alert("Sum is: " + sum);
    };

    function allAvgF() {
      let avgmark = 0;
      $scope.students.forEach(element => avgmark += element['avg']);
      avgmark /= $scope.students.length;
      $scope.x = avgmark.toFixed(2);

    };

  });

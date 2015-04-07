var app = angular.module("app", ["ngRoute"]);
angular.module("app").config(function($routeProvider){
    $routeProvider
        .when("/people", {
            controller: "peopleCtrl",
            templateUrl: "/templates/people.html"
        })
        .when("/people/:id", {
            controller: "personCtrl",
            templateUrl: "/templates/person.html"
        })
        .when("/things", {
            controller: "thingsCtrl",
            templateUrl: "/templates/things.html"
        })
        .otherwise({
            controller: "homeCtrl",
            templateUrl: "/templates/home.html"
        })
});

angular.module("app").factory("PeopleSvc", function($http){
    
    return {
        getPeople : function(){
        return $http.get("/api/people");
        },
        getPerson : function(id){
        return $http.get("/api/people/" + id);
        }
    };
}); // factories are singletons; only created once

app.controller("homeCtrl", function($scope, $http){
    $scope.message = "Hello from Home"; // proves controllers get called when they are needed
    $scope.changeFoo = function(){
        $scope.foo = "bar : " + Math.random();
    }
});
app.controller("peopleCtrl", function($scope, PeopleSvc){
    $scope.message = "Hello from People";
    
    PeopleSvc.getPeople().then(function(res){
        // console.log(res);
        $scope.people = res.data;
    });   
    $scope.remove = function(person){
        //person.name = person.name.toUpperCase();
        var index = $scope.people.indexOf(person);
        $scope.people.splice(index, 1);
        console.log(person);
    }
});
app.controller("personCtrl", function($scope, $routeParams, PeopleSvc){
    $scope.message = "Hello from Person";
    PeopleSvc.getPerson($routeParams.id).then(function(result){
        $scope.person = result.data;
    });
});
app.controller("thingsCtrl", function($scope, $http){
    $scope.message = "Hello from Things";
});
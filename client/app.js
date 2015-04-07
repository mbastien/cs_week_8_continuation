var app = angular.module("app", ["ngRoute"]);
angular.module("app").config(function($routeProvider){
    $routeProvider
        .when("/people", {
            controller: "peopleCtrl",
            templateUrl: "/templates/people.html"
        })
        .when("/person/:id", {
            controller: "personCtrl",
            templateUrl: "/templates/person.html"
        })
        .when("/things", {
            controller: "thingsCtrl",
            templateUrl: "/templates/things.html"
        })
        .when("/thing/:id", {
            controller: "thingCtrl",
            templateUrl: "/templates/thing.html"
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

angular.module("app").factory("ThingsSvc", function($http){
    
    return {
        getThings : function(){
        return $http.get("/api/things");
        },
        getThing : function(id){
        return $http.get("/api/things/" + id);
        }
    };
});

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
app.controller("thingsCtrl", function($scope, ThingsSvc){
    $scope.message = "Hello from Things";
    ThingsSvc.getThings().then(function(res){
        // console.log(res);
        $scope.things = res.data;
    });   
    $scope.remove = function(thing){
        //person.name = person.name.toUpperCase();
        var index = $scope.things.indexOf(thing);
        $scope.things.splice(index, 1);
        console.log(thing);
    }
});
app.controller("thingCtrl", function($scope, $routeParams, ThingsSvc){
    $scope.message = "Hello from Thing";
    ThingsSvc.getThing($routeParams.id).then(function(result){
        $scope.thing = result.data;
    });
});
// angular.module("app").controller.... <- can also do this
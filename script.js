var app = angular.module("myApp", []);
var api_key = "7b5e30851a9285340e78c201c4e4ab99";
var small_image = "http://image.tmdb.org/t/p/w92";
var small_no_image = "http://slowka.pcmagic.pl/images/brak_obrazka.png";
var big_image = "http://image.tmdb.org/t/p/w500";
var big_no_image = "http://www.caros-service.pl/wp-content/themes/Artificial-Reason-WP/img/no_image.png";

app.controller("myController", function($scope, $http, $window) {

	$scope.currentView = "searchView";

	$scope.smallImage = small_image;
	$scope.smallNoImage = small_no_image;
	$scope.bigImage = big_image;
	$scope.bigNoImage = big_no_image;

	$scope.searchMovies = [];

	$scope.showSearchResults = function(value, page = 1) {
		$scope.search = value;
		$scope.page = page;
		$http.get("http://api.themoviedb.org/3/search/movie?api_key=" + api_key + "&language=pl&include_adult=false&query=" + value + "&page=" + page).success(function(data) {
			$scope.searchMovies = data;
			$scope.pages = data.total_pages;
			console.log($scope.searchMovies);
			$scope.currentView = "searchMoviesView";
		});
	};

	$scope.nextPage = function() {
		if ($scope.page < $scope.pages) {
			$scope.page++;
			$scope.showSearchResults($scope.search, $scope.page);
			$window.scrollTo(0, 0);
		}
	};

	$scope.previousPage = function() {
		if ($scope.page > 1) {
			$scope.page--;
			$scope.showSearchResults($scope.search, $scope.page);
			$window.scrollTo(0, 0);
		}
	};

	$scope.currentMovie = {};
	
	$scope.goToMovie = function(id) {
		$http.get("http://api.themoviedb.org/3/movie/" + id + "?api_key=" + api_key + "&language=pl").success(function(data) {
			$scope.currentMovie = data;
			console.log($scope.currentMovie);
			$scope.currentView = "movieView";
		});
	};

	$scope.changeView = function(viewName) {
		$scope.currentView = viewName;
	};
});


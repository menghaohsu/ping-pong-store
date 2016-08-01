app.controller('ProductCtrl', function($state, $scope, Product, $stateParams, Cart){
  $scope.Cart = Cart;

	Product.getOneProduct($stateParams.id)
  .then(function(product){
  	console.log(product)
		$scope.product = product;
		Product.getProductReviews($stateParams.id)
		.then(function(reviews){
			console.log("Reviews are: ", reviews);
			$scope.reviews = reviews;
		})
	})

	$scope.returnToStore = function(){
		$state.go('home');
	}
	
});


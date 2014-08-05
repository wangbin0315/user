var umService = angular.module( 'UserManage', [ 'ngRoute' ] );

function umRouteConfig ( $routeProvider ) {
	$routeProvider
	.when( '/', {
		controller: ListController,
		templateUrl: 'list.html'
	})
	.when( '/update/:id', {
		controller: UpdateController,
		templateUrl: 'detail.html'
	})
	.when( '/delete', {

	})
	.otherwise({
      redirectTo: '/'
    });
}

umService.config( umRouteConfig );

function ListController ( $scope, $http ) {
	$http.get( 'server/user.json' ).success( function ( data) {
		console.log( data );
		$scope.users = data;
	});
}

function UpdateController ( $scope, $http, $routeParams ) {
	var id = $routeParams.id;
	$http.get( 'server/user.json' ).success( function ( data ) {
		$scope.updateUser = getObjById( id, data );	
	});

	$scope.update = function () {
		$http.get( 'server/user.json', { params: $scope.updateUser } );
	}
}

function getObjById ( id, obj ) {
	var len = obj.length;
	for(var i=0; i<len; i++){
		if( id == obj[i].id ){
			return obj[i];
		}		
	}
	return null;
}

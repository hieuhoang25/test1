app.controller('homeControl', function ($scope, $rootScope, $http) {
    $rootScope.allProduct();

    // //show category
    // $http({
    //     method: "get",
    //     url: localhost + "categories",
    //     headers: { 'Accept': '*/*' }
    // }).then(function success(response) {
    //     $scope.categories = response.data;
    // }, function error(response) {
    //     alert(response)
    // })

    // //fill sản phẩm theo danh mục
    // $scope.fillByCategory = function (idCategory) {
    //     $http({
    //         method: "get",
    //         url: localhost + "products/bycategory/" + idCategory,
    //         headers: { 'Accept': '*/*' }
    //     }).then(function success(response) {
    //         $rootScope.products = response.data;
    //     }, function error(response) {
    //         alert(response)
    //     })
    // }
}).directive('onFinishRender', function ($timeout) {
    return {
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    slider();
                });
            }
        }
    }
});







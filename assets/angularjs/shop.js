app.controller('shopControl', function ($scope, $rootScope, $http, $route) {
    $rootScope.allProduct(0,2,true);
    //lấy toàn bộ size
    $scope.getAllColor = function () {
        $http({
            method: "get",
            url: localhost + "colors",
            headers: { 'Accept': '*/*'}
        }).then(function success(response) {
            $scope.colorsShop = response.data;
        }, function error(response) {
            alert(response.data)
        })
    }
    // lấy toàn bộ màu
    $scope.getAllSize = function () {
        $http({
            method: "get",
            url: localhost + "sizes",
            headers: { 'Accept': '*/*'}
        }).then(function success(response) {
            $scope.sizesShop = response.data;
        }, function error(response) {
            alert(response.data)
        })
    }
    //show danh mục và loại
    $scope.categories = function () {
        $http({
            method: "get",
            url: localhost + "categories",
            headers: { 'Accept': '*/*'}
        }).then(function success(response) {
            $scope.categories = response.data;
        }, function error(response) {
            console.log(response.data)
        })
    }

    //fill sản phẩm theo style
    $scope.fillByProductStyle = function(idCategory,idProductStyle){
        $http({
            method: "get",
            url: localhost + "products/bystyle/"+idProductStyle+"/"+idCategory,
            headers: { 'Accept': '*/*'}
        }).then(function success(response) {
            $rootScope.products = response.data;
        }, function error(response) {
            console.log(response.data)
        })
        $('input:checkbox').each(function () {
            $(this).prop('checked',false)
        });

        $('.size').each(function(){
          $(this).css("color", "#999");
          $(this).css("border-color", "white");
        })
    }

    //fill sản phẩm theo màu
    $scope.fillProductByColor = function(idColor){
        $http({
            method: "get",
            url: localhost + "productcolor/"+idColor,
            headers: { 'Accept': '*/*'}
        }).then(function success(response) {
            $rootScope.products =response.data;
        }, function error(response) {
            console.log(response.data)
        })
        
        $('.size').each(function(){
            $(this).css("color", "#999");
            $(this).css("border-color", "white");
          })
    }
    

    

    //fill sản phẩm theo size
    $scope.fillBySize = function (idSize) {
        $http({
            method: "get",
            url: localhost + "productcolor/bysize/"+idSize,
            headers: { 'Accept': '*/*'}
        }).then(function success(response) {
            $rootScope.products = response.data;
        }, function error(response) {
            console.log(response.data)
        })
        $rootScope.selectedHoverSize(idSize)
        $('input:checkbox').each(function () {
            $(this).prop('checked',false)
        });
    }

    //phân trang
    $rootScope.pagination = function (totalPage){
        $('#pagination').twbsPagination({
            totalPages: totalPage,
            visiblePages: 5,
            autoHidePrevious: true,
            autoHideNext: true,
            onPageClick: function (event, page) {
                $rootScope.allProduct(page -1 ,2,false)
            }
        });
    }

    $scope.getAllColor();
    $scope.getAllSize();
    $scope.categories();
}).directive('onFinishRenderShop', function ($timeout, $rootScope) { //check nếu ng-repeat đã lặp xong
    return {
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    //chọn 1 checkbox sẽ hủy bỏ các checkbox khác
                    $('input:checkbox').on('change', function () {
                        $('input:checkbox').not(this).prop('checked', false);
                    });
                    load_js("https://cdnjs.cloudflare.com/ajax/libs/twbs-pagination/1.4.2/jquery.twbsPagination.min.js", 'on');
                    $rootScope.pagination($rootScope.totalPage,$rootScope.currentPage);
                });
            }
        }
    }
}); 
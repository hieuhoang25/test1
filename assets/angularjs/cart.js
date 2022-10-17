app.controller('cartControl',function($scope,$rootScope){
    $scope.carts = JSON.parse(localStorage.getItem('user'));

    $scope.removeCart = function(idCart){
        delete $scope.carts[idCart];
        localStorage.setItem('user',JSON.stringify($scope.carts));
        $rootScope.countItems();//cập nhật lại số lương sản phẩm trong giỏ
    }

    $scope.amount = function(idCart,price,quantity){
        let amount = price * quantity;
        //tự động xóa cart khi số lượng bằng 0
        if(quantity <= 0)
        $scope.removeCart(idCart)

        //cập nhật lại số lượng sản phầm người dùng
        $scope.carts[idCart].quantity = quantity;
        $scope.carts[idCart].amount = amount;
        localStorage.setItem('user',JSON.stringify($scope.carts));


        return amount;
    }
}) 
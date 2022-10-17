function load_js(source, status) {
    var head = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.src = source;
    head.appendChild(script);
}

app.controller('myControl', function ($route, $scope, $rootScope, $http,$location) {
    //fill hình ảnh
    $rootScope.images = function(fileName){
        return`${urlImages}/${fileName}?alt=media`;
    }

    

    
    $scope.$on('$viewContentLoaded', function () {
        load_js("assets/js/slick.min.js", 'on');
        load_js("assets/js/wow.min.js", 'on');
        load_js("assets/js/jquery.scrollup.min.js", 'on')
        load_js("assets/js/images-loaded.min.js", 'on');
        load_js("assets/js/isotope.pkgd.min.js", 'on');
        load_js("assets/js/tippy-bundle.umd.js", 'on')
        load_js("assets/js/jquery-ui.min.js", 'on')
        load_js("assets/js/mailchimp-ajax.js", 'on');
        load_js("assets/js/main.js", 'on');
        load_js("assets/js/jquery.instagramFeed.min.js", 'on');
        load_js("assets/js/jquery.magnific-popup.min.js", 'on');
    });
    
    //show product
    $rootScope.allProduct = function (page=0,size=10,unchecked) {
        $http({
            method: "get",
            url: localhost + "products?pageNum="+page+"&size="+size,
            headers: { 'Accept': '*/*' }
        }).then(function success(response) {
            let page = response.data;
            $rootScope.totalPage = page.totalPages;
            $rootScope.products = page.products;
            $rootScope.getTotalPage = function(totalPage){
                return new Array(totalPage)
            };
            $rootScope.firstPage = page.first;
            $rootScope.lastPage = page.last;
            $rootScope.currentPage = page.currentPage;
        }, function error(response) {
            console.log(response.data)
        })


        //bỏ tích checkbox khi tìm theo màu
        if(unchecked == true){
            $('input:checkbox').each(function () {
                $(this).prop('checked',false)
            });

            $('.size').each(function(){
              $(this).css("color", "#999");
              $(this).css("border-color", "white");
            })
            
        }
        
    }

    $rootScope.allProduct();
  

    //product detail
    $rootScope.showModalProductDetail = function (idProduct) {
        $rootScope.idProduct = idProduct;
        
        //hiện màu của sản phẩm hiện có
        $http({
            method: "get",
            url: localhost + "colors/byproduct/" + idProduct,
            headers: { 'Accept': '*/*'}
        }).then(function success(response) {
            $rootScope.colors = response.data;
            $rootScope.selectedColor ={color: $rootScope.colors[0]};
            //hiện sản phẩm theo id lên modal
            $http({
                method: "get",
                url: localhost + "productcolor/detail/" + idProduct + "/" + $rootScope.colors[0].idColor,
                headers: { 'Accept': '*/*'}
            }).then(function success(response) {
                $rootScope.product = response.data;
                //hiện size sản phẩm hiện có
                $http({
                    method: "get",
                    url: localhost + "size/" + $rootScope.product.idProductsColors,
                    headers: { 'Accept': '*/*'}
                }).then(function success(response) {
                    $rootScope.sizes = response.data;
                    $rootScope.selectedSize ={size: $rootScope.sizes[0]} ;
                    console.log($rootScope.selectedSize)
                }, function error(response) {
                    console.log('something wrong.....')
                })
            }, function error(response) {
                console.log('something wrong.....')
            })

        }, function error(response) {
            console.log('something wrong.....')
        })
    }

    //thay đổi ảnh màu của sản phầm
    $rootScope.changeColorProduct = function () {
        //thay đổi màu sản phẩm
        $http({
            method: "get",
            url: localhost + "productcolor/detail/" + $rootScope.idProduct + "/" + $rootScope.selectedColor.color.idColor,
            headers: { 'Accept': '*/*'}
        }).then(function success(response) {
            $rootScope.product = response.data;
        }, function error(response) {
            console.log('something wrong.....')
        })
    }
    

    $scope.getIdSize = function (idSize) {
        $rootScope.idSize = idSize
    }

    //đếm số sản phẩm có trong giỏ
    $rootScope.items = 0;
    $rootScope.countItems = function () {
        $rootScope.cart = JSON.parse(localStorage.getItem('user'));
        if ($rootScope.cart != null)
            $rootScope.items = Object.keys($rootScope.cart).length;
    }


    //add to cart
    $rootScope.addToCart = function () {
        $rootScope.countItems();
        $http({
            method: "post",
            url: localhost + "cart/" + $rootScope.idProduct + "/" + 
            $rootScope.selectedSize.size.idSize + "/" + $rootScope.selectedColor.color.idColor,
            headers: { 'Accept': '*/*'},
            data: $rootScope.cart
        }).then(function success(response) {
            localStorage.setItem('user', JSON.stringify(response.data))
            $rootScope.countItems();
        }, function error(response) {
            console.log('something wrong.....')
        })
    }
    $rootScope.countItems();



    $rootScope.selectedHoverSize = function(idSize){
        $('.size').each(function(){
            if($(this).attr('value') == idSize){
                $(this).css('color','black')
                $(this).css('border-color','black')
            }else{
                $(this).css('color','#999')
                $(this).css('border-color','white')
            }
       
        })
    }

})
//xóa khoảng trắng
app.filter('removeSpaces', [function () {
    return function (string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
    };
}])


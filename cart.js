angular.module('ngCart',[]).directive('shoppingCart', function ($location) {
  return {
    restrict: 'E',
    template : ['<style type="text/css">',
                '.table>tbody>tr>td, .table>tfoot>tr>td{',
                  'vertical-align: middle;',
                '}',
                '@media screen and (max-width: 600px) {',
                  'table#cart tbody td .form-control{',
                    'width:20%;',
                    'display: inline !important;',
                  '}',
                  '.actions .btn{',
                    'width:36%;',
                    'margin:1.5em 0;',
                  '}',
                  '.actions .btn-info{',
                    'float:left;',
                  '}',
                  '.actions .btn-danger{',
                    'float:right;',
                  '}',
                  'table#cart thead { display: none; }',
                  'table#cart tbody td { display: block; padding: .6rem; min-width:320px;}',
                  'table#cart tbody tr td:first-child { background: #333; color: #fff; }',
                  'table#cart tbody td:before {',
                    'content: attr(data-th); font-weight: bold;',
                    'display: inline-block; width: 8rem;',
                  '}',
                  'table#cart tfoot td{display:block; }',
                  'table#cart tfoot td .btn{display:block;}',
                '}',
                '.display-inline {',
                  'display: inline;',
                '}',
                '.empty-cart-header {',
                  'color: salmon;',
                  'font-size: 26px;',
                  'font-style: oblique;',
                  'padding: 50px;',
                '}',
                '.start-shopping-now-button {',
                  'color: salmon;',
                  'font-size: 26px;',
                  'font-style: oblique;',
                  'padding: 50px;',
                '}',
                '</style>',
                '<div class="modal fade" id="cartModal" role="dialog">',
                '<div class="modal-dialog modal-lg">',
                  '<div class="modal-content">',
                    '<div class="modal-header">',
                      '<button type="button" class="close" data-dismiss="modal">&times;</button>',
                       '<center><div ng-bind-html="cartTitle"></div><center>',
                     '</div>',
                     '<div class="modal-body">',
                      '<div class="empty-cart" ng-if="items.length===0">',
                        '<div class="empty-cart-header">',
                          '<center>Shopping Cart is empty!</center>',
                        '</div>',
                        '<div class="start-shopping-now-button">',
                          '<button class="btn btn-success btn-block" data-dismiss="modal">START SHOPPING NOW</button>',
                        '</div>',
                      '</div>',
                      '<table id="cart" class="table table-hover table-condensed" ng-if="items.length>0">',
                        '<thead>',
                          '<tr>',
                            '<th style="width:30%">Product</th>',
                            '<th style="width:5%">Price</th>',
                            '<th style="width:8%">Quantity</th>',
                            '<th style="width:22%" class="text-center">Subtotal</th>',
                            '<th style="width:10%"></th>',
                          '</tr>',
                        '</thead>',
                        '<tbody>',
                          '<tr ng-repeat="item in items">',
                            '<td data-th="Product">',
                              '<div class="row">',
                                '<div class="col-sm-2 hidden-xs"><img src="{{item.img_url}}" alt="..." class="img-responsive"/></div>',
                                '<div class="col-sm-10">',
                                  '<h4 class="nomargin">{{item.name}}</h4>',
                                '</div>',
                              '</div>',
                            '</td>',
                            '<td data-th="Price">{{item.price}}</td>',
                            '<td data-th="Quantity">',
                              '<input type="number" name="item-quantity" class="form-control text-center" ng-model="item.quantity" value="{{item.quantity}}" min="1" max="{{item.stock}}" step="1">',
                            '</td>',
                            '<td data-th="Subtotal" class="text-center">{{item.quantity*item.price}}</td>',
                            '<td class="actions" data-th="">',
                              '<button class="btn btn-danger btn-sm" ng-click="deleteItem(item.id)"><i class="fa fa-trash-o"></i></button>',               
                            '</td>',
                          '</tr>',
                        '</tbody>',
                        '<tfoot>',
                          '<tr class="visible-xs">',
                            '<td class="text-center"><strong>Total {{totalAmount}}</strong></td>',
                          '</tr>',
                          '<tr>',
                            '<td><a href="" class="btn btn-warning" data-dismiss="modal"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>',
                            '<td colspan="2" class="hidden-xs"></td>',
                            '<td class="hidden-xs text-center"><strong>Total {{totalAmount}}</strong></td>',
                            '<td><a href="" ng-click="goToRedirectURL()" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>',
                          '</tr>',
                        '</tfoot>',
                      '</table>',
                    '</div>',
                  '</div>',
                '</div>',
              '</div>'].join(''),           
    scope: {
      items : "="
    },
    controller: function($scope, $cart){

       /* Set cart title */
       $scope.cartTitle = $cart.getCartTitle();

       /* Calculate total amount in cart */
       $scope.$watch("items",function(){
          $scope.totalAmount = 0;
          for(var index=0 ; $scope.items.length > index ; index++) {
            $scope.totalAmount = ($scope.items[index].price * $scope.items[index].quantity) + $scope.totalAmount;
          }
       },true);

       /* Delete the items from cart */
       $scope.deleteItem = function(id) {
           $scope.items = $scope.items.filter(function (item) {
                return item.id !== id;
           });
       };

       /* Go for redirect */
       $scope.goToRedirectURL = function() {
          var returnData = { totalAmount : $scope.totalAmount , items : $scope.items };
          $cart.setResponseData(returnData);
          window.location.assign($cart.getRedirectURL());
       }

    }
  };
});

/* cartProvider */
angular.module('ngCart').provider('$cart', function () {
    this.redirectURL = "";
    this.cartTitle = "Shopping Cart";
    this.responseData = { totalAmount : 0 , items : [] };
    this.initializeRedirectURL = function(url) {
      this.redirectURL = url;
    };
    this.initializeCartTitle = function(cartTitle) {
      this.cartTitle = cartTitle;
    } 

    this.$get = function() {
      var redirectURL = this.redirectURL;
      var cartTitle = this.cartTitle;
      var responseData = this.responseData;
      return {
        getRedirectURL : function() {
          return redirectURL;
        },
        getCartTitle : function() {
          return cartTitle;
        },
        setResponseData : function(returnData) {
          responseData = returnData;
        },
        getResponseData : function() {
          return responseData;
        }
      }
    }
});


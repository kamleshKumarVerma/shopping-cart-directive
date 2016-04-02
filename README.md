# shopping-cart-directive

Prerequisite : -

1) angular.js - 1.x
2) angular-sanitize.js
3) bootstrap.js and bootstrap.css
4) jquery.js


How to Use : - 


STEP 1: add this CDN in your index.html :
        http://myselfietech.in/kamlesh/boost.angular/1.0.0/js/cart.js


STEP 2: Now you have to pass 'ngCart' in your angular module.


STEP 3: Now pass $cartProvider in your config function in order to initialize some value .
        Now we have two method in $cartProvider service : 
        1) $cartProvider.initializeCartTitle("cartTitle") : Put here your cart title , it can be html tag also.
        2) $cartProvider.initializeRedirectURL('url') : Put here redirect url . it will redirect to this URL when you will go for checkout in cart.  

STEP 4: Now you have to sure about , your product object have these properties : 
        img_url, name , price , quantity , stock  in order to get work with cart.


STEP 5: Now , you can use cart in your html page like this way : 
    1) Adding cart-directive here :
       <shopping-cart items="cart"></shopping-cart>
    2) Now , you have to add modal anchor tag , and whenever user will click this cart modal will be open :
       <a href="" data-toggle="modal" data-target="#cartModal"></a>
       Also you can open/close this cart modal from javascript file :
            $('#cartModal').modal('show');
        $('#cartModal').modal('hide');

STEP 6: Now , in your RedirectURL you will get all cart info : 
        you have to pass '$cart' in RedirectURL controller in order to get cart info
        Now we have one method in $cart service : 
    1) $cart.getResponseData() : it will return one response object : { items : productsArray , totalAmount : 44166} 
        productsArray = [{ img_url : "htpp://xyz.abc.abc" , name : "jeans" , price : 2300, quantity : 3 , stock : 200 },
                 { img_url : "htpp://xyz.xyz.abc" , name : "shirt" , price : 1300, quantity : 2 , stock : 300 }]

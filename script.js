var cart = document.querySelector(".cart");
var add_cart = document.querySelector("#add-cart");
var remove_cart = document.querySelector("#remove-cart");

add_cart.addEventListener("click",function(){
    cart.classList.add('active-cart');
})
remove_cart.addEventListener("click",function(){
    cart.classList.remove("active-cart");
})

if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded",ready)
}
else{
    ready();
}

function ready(){
    updateTotal();
//remove buttons
const trashs = document.getElementsByClassName("trash");
for(var i=0; i<trashs.length;i++){
    var trash = trashs[i];
    trash.addEventListener("click",removeItem);
}function removeItem(event){
    var button = event.target;
    button.parentElement.remove();
    updateTotal();
}
//quantity changes
const quantities = document.getElementsByClassName("cart-box-detail-quantity");
for(var i=0;i<quantities.length;i++){
    var quantity = quantities[i];
    quantity.addEventListener('change',quantityChanged);
}
function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value=1;
    }
    updateTotal();
}
//add to cart
var add_to_cart_buttons = document.getElementsByClassName("addToCart");
for(var i=0; i<add_to_cart_buttons.length;i++){
    add_to_cart_button=add_to_cart_buttons[i];
    add_to_cart_button.addEventListener("click",cartAdd);
}
function cartAdd(event){
    var addToCartBtn = event.target;
    var shop_box = addToCartBtn.parentElement.parentElement;
    var image = shop_box.getElementsByClassName("shop-box-image")[0].src;
    var title = shop_box.getElementsByClassName("shop-box-title")[0].innerText;
    var price = shop_box.getElementsByClassName("shop-box-price")[0].innerText;
    addToCart(title,price,image);
  updateTotal();
}
function addToCart(title,price,image){
    var cartItemTitles = document.getElementsByClassName("cart-box-detail-title");
     for(var i=0;i<cartItemTitles.length;i++){
       if(title == cartItemTitles[i].innerText){
        alert("you have already added this item to the cart");
        return;
       }
       }
var box = document.createElement("div");
var content =`
<div class="cart-box">
<img src=${image} alt="image">
<div class="cart-box-details">
    <p class="cart-box-detail-title">${title}</p>
      <h3 class="cart-box-detail-price">${price}</h3>
      <input type="number" value="1" class="cart-box-detail-quantity">
</div>
<i class='bx bxs-trash-alt trash' ></i>
</div>
`;
box.classList.add("cart-contents");
box.innerHTML=content;

const cart_container = document.getElementsByClassName("cart-contents")[0];
cart_container.append(box);
box.getElementsByClassName("trash")[0].addEventListener("click",removeItem);
box.getElementsByClassName("cart-box-detail-quantity")[0].addEventListener("change",quantityChanged);
}

var buyBtn = document.getElementsByClassName("buy-btn")[0];
var cart_container = document.getElementsByClassName("cart-contents")[0];
buyBtn.addEventListener("click",addBtnClicked);
function addBtnClicked(){
    alert("you order is placed")
        while(cart_container.hasChildNodes()){
            cart_container.removeChild(cart_container.firstChild)
        }
    
updateTotal();
}
    

//update total
function updateTotal(){
const cart_contents = document.getElementsByClassName("cart-contents")[0];
var cart_boxes = cart_contents.getElementsByClassName("cart-box");
var total=0;
for(var i=0;i<cart_boxes.length;i++){
    var priceElement = cart_boxes[i].getElementsByClassName("cart-box-detail-price")[0];
    var quantityElement =  cart_boxes[i].getElementsByClassName("cart-box-detail-quantity")[0];  
    var price = priceElement.innerText.replace("$","");
    var quantity = quantityElement.value;
    total=total + (price*quantity);
}
document.getElementsByClassName("total-value")[0].innerText="$" + total;

}


}
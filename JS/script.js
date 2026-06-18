// Search
var searchbox = document.querySelector(".search"); 
var boxes = document.querySelectorAll(".cards"); 

searchbox.addEventListener('keyup', (e) => {
    let searchtext = e.target.value.toLowerCase().trim();

    boxes.forEach((box) => {
        const data = box.dataset.item.toLowerCase(); 
        if (data.includes(searchtext)) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    });
});

// Responsive Search
var searchbox = document.getElementById("rsearch"); 
var boxes = document.querySelectorAll(".cards"); 

searchbox.addEventListener('keyup', (e) => {
    let searchtext = e.target.value.toLowerCase().trim();

    boxes.forEach((box) => {
        const data = box.dataset.item.toLowerCase(); 
        if (data.includes(searchtext)) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    });
});

// Cart Open
const cartBox = document.getElementById("cart-box");
document.getElementById("cart-open").addEventListener("click", () => {
  cartBox.classList.add("active");
});

// Cart Close
const cancelicon = document.getElementById("cancel")
document.getElementById("cancel").addEventListener("click", () => {
  cartBox.classList.remove("active")
})

// Add poduct to the cart
function createproduct(foodimage, foodprice, foodtitle) {
  return `
    <div class="cart-item">
      <div class="round-img">
        <img src="${foodimage}" alt="">
        <div>
          <h3>${foodtitle}</h3>
          <div id="price-details">
            <p class="item-price">₹ ${foodprice}</p>
            <p class="item-amt">Rs.${foodprice}</p>
          </div>
          <div id="count-box">
            <input type="number" value="1" min="1" class="cart-quantity">
            <i class="fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
      <hr style="border: 2px solid black;">
    </div>
  `;
}


const addcartbtn = document.querySelectorAll(".cart-btn button");

addcartbtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const card = this.closest(".cards");

    const foodtitle = card.querySelector(".food-title").innerText;
    const foodprice = card.querySelector(".price").innerText;
    const foodimage = card.querySelector("img").src;

    const cartItems = document.querySelectorAll(".cart-item h3");

    for (let item of cartItems) {
      if (item.innerText === foodtitle) {
        alert("Product already added to cart..");
        return
      }
    }

    const newproduct = createproduct(foodimage, foodprice, foodtitle);

    const cartbasket = document.getElementById("cart-items");
    const div = document.createElement("div");
    div.innerHTML = newproduct;

    cartbasket.append(div);

    updatetotal()
  })
})

// If the item is present it will not append the item
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-trash")) {
    if (confirm("Are you sure want to remove the product?")) {
      e.preventDefault();
      e.target.closest(".cart-item").remove();
      updatetotal()
    }
  }
});

// Dont go less than 1
document.addEventListener("input", function (e) {
  if (e.target.matches("#count-box input")) {
    if (e.target.value < 1) {
      e.target.value = 1;
    }
  }
});

// Update the Total
function updatetotal(){

  let cartitems = document.querySelectorAll(".round-img")
  let totalvalue = document.querySelector(".totalprice")

  let total = 0

  cartitems.forEach((prod)=>{
    let priceelement = prod.querySelector(".item-price")
    let price = parseFloat(priceelement.innerHTML.replace("₹" , ""));
    let qty = prod.querySelector(".cart-quantity").value
    total += price * qty

    prod.querySelector(".item-amt").innerHTML = "Rs." + price * qty 
  })

  totalvalue.innerHTML = "Rs." + total

  let cartcount = document.querySelector(".cart-count");
  let count = cartitems.length;
  if(cartcount) {
    cartcount.innerHTML = count;

    if (count == 0) {
      cartcount.style.display = "none";
    } else {
      cartcount.style.display = "block";
    }
  }

}

// Update on quantity change
document.addEventListener("input", function (e) {
  if (e.target.matches(".cart-quantity")) {
    if (e.target.value < 1) e.target.value = 1;
    updatetotal(); 
  }
});

// Update on delete
document.addEventListener("input", function (e) {
  if (e.target.matches(".cart-quantity")) {
    if (e.target.value < 1) e.target.value = 1;
    updatetotal();
  }
});

// Place Order
function porder() {
  var cartItems = document.querySelectorAll("#cart-items .round-img"); 
  if (cartItems.length === 0) {
    alert("Your cart is empty! Please add items to place your order.");
  } else {
    alert("Your order is preparing..😋");
  }
}

/* =========================
   PRODUCTS
========================= */

const products = [

    {
        id: "chicken",
        name: "Chicken Pickle",
        price: 250,
        image: "images/chicken-pickle.jpg"
    },

    {
        id: "prawn",
        name: "Prawn Pickle",
        price: 200,
        image: "images/prawn-pickle.jpg"
    },

    {
        id: "dryfish",
        name: "Dry Fish Pickle",
        price: 200,
        image: "images/dry-fish-pickle.jpg"
    },

    {
        id: "fish",
        name: "Fish Pickle",
        price: 250,
        image: "images/fish-pickle.jpg"
    },

    {
        id: "masi",
        name: "Masai Pickle",
        price: 200,
        image: "images/masai-pickle.jpg"
    },

    {
        id: "nathili",
        name: "Nathili Pickle",
        price: 200,
        image: "images/nathili-pickle.jpg"
    },

    {
        id: "narthaingai",
        name: "Narthaingai Pickle",
        price: 130,
        image: "images/narthaingai-pickle.jpg"
    }

];


/* =========================
   WHATSAPP
========================= */

const whatsappNumber = "919344661218";


/* =========================
   CART
========================= */

let cart = [];


/* =========================
   ELEMENTS
========================= */

const productsGrid =
    document.getElementById("productsGrid");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryElement =
    document.getElementById("delivery");

const totalElement =
    document.getElementById("total");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const cartElement =
    document.getElementById("cart");

const cartBackdrop =
    document.getElementById("cartBackdrop");

const checkoutModal =
    document.getElementById("checkoutModal");

const navLinks =
    document.getElementById("navLinks");

const menuBtn =
    document.getElementById("menuBtn");


/* =========================
   MONEY
========================= */

function money(amount) {

    return "₹" +
        amount.toLocaleString("en-IN");

}


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts() {

    productsGrid.innerHTML = "";

    products.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";


        const imageBox =
            document.createElement("div");

        imageBox.className = "product-image";


        const image =
            document.createElement("img");

        image.src = product.image;

        image.alt = product.name;


        /*
            If the image does not exist,
            hide the broken image icon.
            The product image area remains blank.
        */

        image.onerror = function () {

            this.style.display = "none";

            imageBox.classList.add("blank");

        };


        imageBox.appendChild(image);


        const info =
            document.createElement("div");

        info.className = "product-info";


        info.innerHTML = `

            <h3>
                ${product.name}
            </h3>

            <p class="product-weight">
                Net Weight: 275g
            </p>

            <p class="product-price">
                ${money(product.price)}
            </p>

            <button
                class="product-button"
                onclick="addToCart('${product.id}')"
            >
                ADD TO CART
            </button>

        `;


        card.appendChild(imageBox);

        card.appendChild(info);

        productsGrid.appendChild(card);

    });

}


/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: id,
            quantity: 1
        });

    }


    updateCart();

    openCart();

}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);


    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    updateCart();

}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );

    updateCart();

}


/* =========================
   SUBTOTAL
========================= */

function calculateSubtotal() {

    let subtotal = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product =>
                    product.id === item.id
            );


        if (product) {

            subtotal +=
                product.price *
                item.quantity;

        }

    });


    return subtotal;

}


/* =========================
   DELIVERY
========================= */

function getDeliveryCharge() {

    const state =
        document.getElementById(
            "customerState"
        ).value;


    if (!state) {
        return 0;
    }


    if (state === "Tamil Nadu") {
        return 50;
    }


    return 100;

}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartCount.textContent = count;


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        emptyCart.style.display = "block";

    } else {

        emptyCart.style.display = "none";


        cart.forEach(item => {

            const product =
                products.find(
                    product =>
                        product.id === item.id
                );


            if (!product) {
                return;
            }


            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-top">

                    <div>

                        <div class="cart-item-name">
                            ${product.name}
                        </div>

                        <div class="cart-item-weight">
                            275g
                        </div>

                    </div>

                    <div class="cart-item-price">
                        ${money(
                            product.price *
                            item.quantity
                        )}
                    </div>

                </div>


                <div class="quantity-control">

                    <button
                        onclick="changeQuantity(
                            '${product.id}',
                            -1
                        )"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(
                            '${product.id}',
                            1
                        )"
                    >
                        +
                    </button>

                    <button
                        class="remove-item"
                        onclick="removeItem(
                            '${product.id}'
                        )"
                    >
                        Remove
                    </button>

                </div>

            `;


            cartItems.appendChild(cartItem);

        });

    }


    updateTotals();

}


/* =========================
   TOTALS
========================= */

function updateTotals() {

    const subtotal =
        calculateSubtotal();


    const state =
        document.getElementById(
            "customerState"
        ).value;


    const delivery =
        getDeliveryCharge();


    const total =
        subtotal + delivery;


    subtotalElement.textContent =
        money(subtotal);


    if (!state) {

        deliveryElement.textContent =
            "Select at checkout";

        totalElement.textContent =
            money(subtotal);

    } else {

        deliveryElement.textContent =
            money(delivery);

        totalElement.textContent =
            money(total);

    }


    checkoutTotal.textContent =
        money(total);

}


/* =========================
   OPEN CART
========================= */

function openCart() {

    cartElement.classList.add("open");

    cartBackdrop.classList.add("show");

}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    cartElement.classList.remove("open");

    cartBackdrop.classList.remove("show");

}


/* =========================
   OPEN CHECKOUT
========================= */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Please add a product to your cart first."
        );

        return;

    }


    closeCart();

    checkoutModal.classList.add("show");

    document.body.classList.add("no-scroll");

    updateTotals();

}


/* =========================
   CLOSE CHECKOUT
========================= */

function closeCheckout() {

    checkoutModal.classList.remove("show");

    document.body.classList.remove("no-scroll");

}


/* =========================
   STATE CHANGE
========================= */

document
    .getElementById("customerState")
    .addEventListener(
        "change",
        updateTotals
    );


/* =========================
   CHECKOUT
========================= */

document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            const name =
                document
                    .getElementById("customerName")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("customerPhone")
                    .value
                    .trim();


            const address =
                document
                    .getElementById("customerAddress")
                    .value
                    .trim();


            const state =
                document
                    .getElementById("customerState")
                    .value;


            const subtotal =
                calculateSubtotal();


            const delivery =
                getDeliveryCharge();


            const total =
                subtotal + delivery;


            let orderDetails = "";


            cart.forEach(item => {

                const product =
                    products.find(
                        product =>
                            product.id === item.id
                    );


                if (!product) {
                    return;
                }


                const itemTotal =
                    product.price *
                    item.quantity;


                orderDetails +=
                    `• ${product.name} | 275g | Qty: ${item.quantity} | ${money(itemTotal)}\n`;

            });


            const message =
`Hello SRI SEA FOODS! 👋

NEW ORDER

CUSTOMER DETAILS

Name: ${name}

Phone: ${phone}

DELIVERY ADDRESS:

${address}

STATE:
${state}

ORDER DETAILS:

${orderDetails}
Subtotal: ${money(subtotal)}

Delivery Charge: ${money(delivery)}

TOTAL BILL: ${money(total)}

Please confirm my order.

Thank you!`;


            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(message);


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );


/* =========================
   WHATSAPP CONTACT
========================= */

function openWhatsApp() {

    const message =
        "Hello SRI SEA FOODS! I would like to know more about your pickles.";


    const url =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        url,
        "_blank"
    );

}


/* =========================
   MOBILE MENU
========================= */

menuBtn.addEventListener(
    "click",
    function() {

        navLinks.classList.toggle("show");

    }
);


/* =========================
   CLOSE MOBILE MENU
========================= */

navLinks
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            function() {

                navLinks.classList.remove("show");

            }
        );

    });


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeCart();

            closeCheckout();

        }

    }
);


/* =========================
   YEAR
========================= */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();


/* =========================
   START WEBSITE
========================= */

displayProducts();

updateCart();
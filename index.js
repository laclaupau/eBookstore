

const hide = (element) => {
    return element.classList.add('is-hidden');
};
const show = (element) => {
    return element.classList.remove('is-hidden');
};
const normalize = (str) => {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    str = str.toLowerCase();
    return str;
};
const showOverlay = () => {
    show(overlay);
};
const hideOverlay = () => {
    hide(overlay);
};
const bodyNoScroll = () => {
    document.body.classList.add('no-scroll');
};
const bodyScroll = () => {
    document.body.classList.remove('no-scroll');
};




/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                              FILTERS
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/


const searchInput = document.querySelector('#search-input');
const products = document.getElementsByClassName('product');
const reviewFilters = document.getElementsByClassName('filter-review');
const categoryFilters = document.getElementsByClassName('filter-category');
const checkboxes = document.querySelectorAll('.filter');
const clearBtn = document.querySelector('.clear-btn');


const searchOn = () => {
    if (searchInput.value.length !== 0) {
        return true;
    } else {
        return false;
    }
};
const categoryOn = () => {
    for (const filter of categoryFilters) {
        if (filter.checked) {
            return true;
        }
    }
    return false;
};
const reviewOn = () => {
    for (const filter of reviewFilters) {
        if (filter.checked) {
            return true;
        }
    }
    return false;
};


/* --------- go over filters one by one -----------*/
const passCategoryFilter = (product) => {
    const category = product.dataset.category;
    const categoryFilter = document.querySelector(`.filter-category[value="${category}"]`);
    return categoryFilter.checked;
};
const passReviewFilter = (product) => {
    const review = product.dataset.review;
    const reviewFilter = document.querySelector(`.filter-review[value="${review}"]`);
    return reviewFilter.checked;
};
const passSearchInput = (product) => {
    let name = product.dataset.name;
    let standarizedName = normalize(name);
    let standarizedInputSearch = searchInput.value;
    standarizedInputSearch = normalize(standarizedInputSearch);
    return standarizedName.includes(standarizedInputSearch);
};


const passAllFilters = (product) => {
    return (
        (passCategoryFilter(product) || !categoryOn()) &&
        (passReviewFilter(product) || !reviewOn()) &&
        (passSearchInput(product) || !searchOn())
    );
};


/* ------- Update number of filtered products ------ */
let productsQty = document.getElementById('products-amount');


const updateQtyProducts = () => {
    let quantity = 0;
    for (const product of products) {
        if (passAllFilters(product)) {
            quantity++;
        }
    }
    productsQty.innerText = `Showing ${quantity} product(s) of ${products.length}`;
};


/* -------- Show filtered products -------------*/


const showProducts = () => {
    for (const product of products) {
        hide(product); // Hide all to begin with
        if (passAllFilters(product)) {
            show(product);
        } else {
            hide(product);
        }
    }
};


/*--------  Filtering process  ---------*/


const filterProducts = () => {
    showProducts();
    updateQtyProducts();
};


/******************💛💛💛 Clear filters 💛💛💛********************* */


const clearSearchInput = () => {
    searchInput.value = ''
};


const clearCheckedCheckboxes = () => {
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            checkbox.checked = false;
        }
    }
};


const showAllProducts = () => {
    for (let product of products) {
        show(product);
    }
};


/************** 💛💛💛  Initialize filters  💛💛💛*********** */


for (let checkbox of checkboxes) {
    checkbox.onclick = () => {
        filterProducts();
    };
}


searchInput.oninput = () => {
    filterProducts();
};


clearBtn.onclick = () => {
    clearCheckedCheckboxes();
    clearSearchInput();
    showAllProducts();
    updateQtyProducts();
};


/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                            GRID & LIST VIEWS
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/


const gridViewBtn = document.querySelector('#grid-view-btn');
const listViewBtn = document.querySelector('#list-view-btn');
const productsListContainer = document.querySelector('.products-list');
const productsDescriptions = document.querySelectorAll('.product-description');


/******************💛💛💛       Switch layout       💛💛💛***************/


showGrid = () => {
    productsListContainer.classList.remove('column');
    productsListContainer.classList.add('grid');
    for (let p of products) {
        p.classList.remove('centered-product');
    }
    for (let d of productsDescriptions) {
        hide(d);
    }
};


showList = () => {
    productsListContainer.classList.remove('grid');
    productsListContainer.classList.add('column');
    for (let p of products) {
        p.classList.add('centered-product');
    }
    for (let d of productsDescriptions) {
        show(d);
    }
};


gridViewBtn.onclick = () => {
    showGrid();
};


listViewBtn.onclick = () => {
    showList();
};


/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                                RESPONSIVE FILTERS
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/


const btnOpenFilters = document.querySelector('.open-filters-btn');
const btnCloseFilters = document.querySelector('.close-filters-btn');
const filtersAside = document.querySelector('#filters-aside');


btnOpenFilters.onclick = () => {
    filtersAside.classList.add('aside-responsive');
    filtersAside.classList.add('theme-sky-dark');
    filtersAside.style.display = 'block';
};


btnCloseFilters.onclick = () => {
    filtersAside.classList.remove('aside-responsive');
    filtersAside.classList.remove('theme-sky-dark');
    filtersAside.style.display = 'none';
};


/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                                CART
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/

const showCartBtn = document.querySelector('.btn-cart');
const closeCartBtn = document.querySelector('.btn-close');
const cart = document.querySelector('.cart');
const overlay = document.querySelector('.overlay');
const cartSubtotals = document.querySelectorAll('.cart-subtotal-value');
const allAddToCartBtns = document.querySelectorAll('.button-add-to-cart');
const productsCounter = document.querySelectorAll('.cart-qty');
const cartFullMsg = document.querySelector('.cart-full');
const cartclearMsg = document.querySelector('.cart-clear');
const cartProducts = document.querySelector('.cart-products-added');
let subtotalProductsAdded = 0;

const showCart = () => {
	show(cart);
  cart.classList.remove('cart-hidden');
  cart.setAttribute('aria-hidden', false)
	for (let c of productsCounter) {
		if (c.innerText == 0) {
			hide(cartFullMsg);
			show(cartclearMsg);
		}
	}
};
const hideCart = () => {
  cart.classList.add('cart-hidden');
  cart.setAttribute('aria-hidden', true)
	hide(cart);
	show(cartFullMsg);
	hide(cartclearMsg);
};


const addCounterCart = () => {
	for (let c of productsCounter) {
		let counterNumber = Number(c.innerText);
		counterNumber++;
		c.innerText = counterNumber;
	}
};
const subtractCounterCart = () => {
	for (let c of productsCounter) {
		let counterNumber = Number(c.innerText);
		counterNumber--;
		c.innerText = counterNumber;
	}
};

const knowProduct = (btn, list) => {
	for (let x of list)
		if (x.dataset.id === btn.getAttribute('id')) {
			return x;
		}
};

const addSubtotal = (subtotal) => {
	subtotalProductsAdded = subtotalProductsAdded + Number(subtotal);
	for (let c of cartSubtotals) {
		c.innerText = subtotalProductsAdded;
	}
};

const subtractSubtotal = (subtotal) => {
	subtotalProductsAdded = subtotalProductsAdded - Number(subtotal);
	for (let c of cartSubtotals) {
		c.innerText = subtotalProductsAdded;
	}
};

addPriceToSubtotal = (btnAddToCart) => {
	let productAdded = knowProduct(btnAddToCart, products);
	let subtotal = productAdded.dataset.price;
	addSubtotal(subtotal);
};

const displayProductInCart = (id, name, price, image) => {
	return `<article class="cart-product-added" data-id="${id}" data-qty="1" data-price=${price}>
    <img src="${image}" alt="" class="cart-product-img" />
    <div class="cart-product-details">
      <div class="cart-product-info">
        <h3 class="cart-product-name">${name}</h3>
        <button type="button" class="remove-from-cart-btn" id="${id}"><i class="far fa-trash-alt"></i></button>
      </div>
      <div class="cart-product-price-qty">
        <input data-price="${price}" type="number" min="0" value="1" class="cart-product-qty"/> items.
        <p class="cart-product-price">$${price}</p>
      </div>
    </div>
  </article>`;
};

const showProductsInCart = (btnAddToCart) => {
	let productAdded = knowProduct(btnAddToCart, products);
	const template = displayProductInCart(
		productAdded.dataset.id,
		productAdded.dataset.name,
		productAdded.dataset.price,
		productAdded.dataset.image
	);
	cartProducts.innerHTML += template;
	
};


showCartBtn.onclick = () => {
	showOverlay();
	overlay.style.zIndex = '2';
	bodyNoScroll();
	showCart();
};

closeCartBtn.onclick = () => {
	hideOverlay();
	overlay.style.zIndex = '1';
	bodyScroll();
	hideCart();
};


const removeProductFromCart = (btnRemove) => {
	const allProductsAdded = document.querySelectorAll(".cart-product-added")	
	let productToRemove = knowProduct(btnRemove, allProductsAdded)
	let subtotal = productToRemove.dataset.price;
	subtractSubtotal(subtotal)
	subtractCounterCart()
	productToRemove.remove();
	listenEventsOnCart();
};

const addProductToTheCartList = (inputQty) => {
	let qty = inputQty.getAttribute('value');
	let subtotal = Number(inputQty.dataset.price) * qty;
	addSubtotal(subtotal);
	addCounterCart();
	listenEventsOnCart();
};

const listenEventsOnCart = () => {
	const allBtnRemove = document.querySelectorAll('.remove-from-cart-btn');
	const allInputsProductQty = document.querySelectorAll('.cart-product-qty');
	for (const btnRemove of allBtnRemove) {
		btnRemove.onclick = () => {
			removeProductFromCart(btnRemove);
		};
	}

	for (inputQty of allInputsProductQty) {
		inputQty.onchange = () => {
			addProductToTheCartList(inputQty);
		};
	}
};


for (let btnAddToCart of allAddToCartBtns) {
	btnAddToCart.onclick = () => {
		addCounterCart();
		addPriceToSubtotal(btnAddToCart);
		showProductsInCart(btnAddToCart);
		listenEventsOnCart();
	};
}


/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                                CART MODALS
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/

const clearCartBtn = document.querySelector('.btn-clear-cart');
const clearCartModal = document.querySelector('.modal-clear-cart');
const confirmClearCartBtn = document.querySelector('.confirm-clear-cart-btn');
const cancelClearCartBtn = document.querySelector('.cancel-clear-cart-btn');

resetCounterCart = () => {
	for (let c of productsCounter) {
		c.innerText = '0';
	}
};
resetPriceToSubtotal = () => {
	subtotalProductsAdded = 0;
	for (let c of cartSubtotals) {
		c.innerText = subtotalProductsAdded;
	}
};

hideAllProductsInCart = () => {
	cartProducts.innerHTML = '';
};

const openClearCartModal = () => {
  show(clearCartModal);
  clearCartModal.setAttribute('aria-hidden', false)
};

const clearCartConfirm = () => {
	resetCounterCart();
	resetPriceToSubtotal();
	hideAllProductsInCart();
	showCart();
  hide(clearCartModal);
  overlay.style.zIndex = 2
  clearCartModal.setAttribute('aria-hidden', true)
};

clearCartBtn.onclick = () => {
	openClearCartModal();
	showOverlay();
    bodyNoScroll();
  overlay.style.zIndex = 4
};

confirmClearCartBtn.onclick = () => {
	clearCartConfirm();
	hideOverlay();
	bodyScroll();
	hide(clearCartModal);
	overlay.style.zIndex = '1';
};
cancelClearCartBtn.onclick = () => {
	hideOverlay();
	bodyScroll();
	hide(clearCartModal);
	overlay.style.zIndex = '1';
};

/*💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛
                                    CONFIRM CHECKOUT
💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛💛*/

const openCheckoutBtn = document.querySelector('.btn-buy');
const confirmPurchaseBtn = document.querySelector('.btn-finish-buy');
const cancelPurchaseBtn = document.querySelector('.btn-keep-buying');
const checkoutMenu = document.querySelector('.checkout-modal');


const showCheckout = () => {
  show(checkoutMenu);
  checkoutMenu.setAttribute('aria-hidden', false)
  overlay.style.zIndex = 4
};

const hideCheckout = () => {
  hide(checkoutMenu);
  checkoutMenu.setAttribute('aria-hidden', true)
};

openCheckoutBtn.onclick = () => {
	showOverlay();
	overlay.style.zIndex = '3';
	bodyNoScroll();
	showCheckout();
	getTotal();
};

confirmPurchaseBtn.onclick = () => {
	hideOverlay();
	overlay.style.zIndex = '1';
    bodyScroll();
    resetCounterCart();
	resetPriceToSubtotal();
    hideAllProductsInCart();
    resetPaymentMethods()
	hideCheckout();
	hideCart();
};

cancelPurchaseBtn.onclick = () => {
	hideOverlay();
	overlay.style.zIndex = '1';
	bodyScroll();
	hideCheckout();
	hideCart();
};

/******************💛💛💛      CHECKOUT OPERATIONS       💛💛💛***************/

const allPaymentMethods = document.querySelectorAll('.pay-option');
const cashOption = document.querySelector('#cash-debit');
const creditOption = document.querySelector('#credit');
const deliveryOption = document.querySelector('#delivery');
const discountOption = document.querySelector('#discount');

const cartTaxValue = document.querySelector('.cart-tax-value');
const discountValue = document.querySelector('.cart-discount-value');
const deliveryValue = document.querySelector('.cart-delivery-value');
const cartTotalValue = document.querySelector('.cart-total-value');

const cartTax = document.querySelector('.cart-tax');
const discount = document.querySelector('.cart-discount');
const delivery = document.querySelector('.cart-delivery');

let cartTaxValueCalculated = 0;
let deliveryPrice = 0;
let discountCalculated = 0;
let cartTotalValueCalculated;
cartTotalValue.textContent = subtotalProductsAdded;

const getCartTax = () => {
	cartTaxValueCalculated = subtotalProductsAdded * 0.1;
};

const addDeliveryPrice = () => {
	deliveryPrice = 50;
};

const getDiscount = () => {
	discountCalculated = -subtotalProductsAdded * 0.1;
};

getTotal = () => {
	if (creditOption.checked) {
		getCartTax();
		show(cartTax);
	} else {
		cartTaxValueCalculated = 0;
		hide(cartTax);
	}
	if (deliveryOption.checked) {
		addDeliveryPrice();
		show(delivery);
	} else {
		deliveryPrice = 0;
		hide(delivery);
	}
	if (discountOption.checked) {
		getDiscount();
		show(discount);
	} else {
		discountCalculated = 0;
		hide(discount);
	}

	cartTaxValue.textContent = cartTaxValueCalculated.toFixed(2);
	deliveryValue.textContent = deliveryPrice.toFixed(2);
	discountValue.textContent = discountCalculated.toFixed(2);

	totalValueCalculated = subtotalProductsAdded + deliveryPrice + discountCalculated + cartTaxValueCalculated;
	cartTotalValue.textContent = totalValueCalculated;
};

for (let payOption of allPaymentMethods) {
	payOption.onclick = () => {
		getTotal();
	};
}

const resetPaymentMethods = () => {
 cashOption.checked = true
 creditOption.checked = false 
 deliveryOption.checked = false
 discountOption.checked = false
}
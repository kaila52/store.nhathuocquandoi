if (localStorage.getItem("cart") == null) {
    localStorage.setItem("cart", "%5B%5D");
}
cart();

function cart() {
    $(".shp__cart__wrap").children().remove();
    $(".head-table").children().remove();
    let products = JSON.parse(decodeURI(localStorage.getItem("cart")));
    let TongTien = 0;
    products.map((value, index) => {
        let subtotal = handervnd(value.price, value.quantity)
        TongTien += parseInt(subtotal);

        $(".shp__cart__wrap").append(`
            <div class="shp__single__product">
                <div class="shp__pro__thumb">
                    <a href="#"><img src="${value.img}" alt="product images"></a>
                </div>
                <div class="shp__pro__details">
                    <h2><a href="${value.url}">${value.title}</a></h2>
                    <span class="quantity">Số Lượng: ${value.quantity}</span>
                </div>
                <div class="remove__btn remove-product">
                    <a href="#" title="xóa sản phẩm"><i class="zmdi zmdi-close"></i></a>
                </div>
            </div>`);
        $(".head-table").append(`
            <tr>
                <td class="product-thumbnail">
                    <a href="#"><img src="${value.img}" alt="product img" /></a>
                </td>
                <td class="product-name"><a href="#">${value.title}</a></td>
                <td class="product-price"><span class="amount">${value.price}</span></td>
                <td class="product-quantity"><input type="number" value="${value.quantity}" /></td>
                <td class="product-subtotal">${subtotal.toLocaleString('de-DE')} đ</td>
                <td class="product-remove remove-page-cart"><a href="#">X</a></td>
            </tr>`);
        $(".cart_totals").find(".amount").html(`${TongTien.toLocaleString('de-DE')} đ`);
        $(".w-100").find(".amount").html(`${TongTien.toLocaleString('de-DE')} đ`);

    })
}

function handervnd(handervnd, quantity) {
    let handerdot = parseInt(handervnd.replace(/\.|đ/g, ""));
    return handerdot * quantity
}

$("body").on("click", ".add-cart", function() {
    let title = $(this).parents(".product").find("h2").find("a").text().trim();
    let price = $(this).parents(".product").find(".new__price").text();
    let img = $(this).parents(".product").find(".pro__thumb").find("img").attr("src");
    let url = $(this).parents(".product").find(".product__action").find("a").attr("href");
    console.log(url)
    var products = JSON.parse(decodeURI(localStorage.getItem("cart")));
    var sanpham = JSON.parse(`{"title":"${title}","price":"${price}", "img":"${img}","url":"${url}", "quantity": 1}`);
    var check = true;
    products.map(value => {
        if (value.title == sanpham.title) {
            value.quantity = parseInt(value.quantity) + parseInt(sanpham.quantity);
            check = false;
        }
    });
    if (check) products.push(sanpham);

    if (products == "") {
        products.push(sanpham);
    }
    localStorage.setItem("cart", encodeURI(JSON.stringify(products)));
    cart();
});

/*-------all page------------ */
$("body").on("click", ".remove-product", function() {
    var products = JSON.parse(decodeURI(localStorage.getItem("cart")));
    products.map((value, index) => {
        if (value.title == $(this).parents(".shp__single__product").find("h2").find("a").text()) {
            products.splice(index, 1);
        }
    })
    localStorage.setItem("cart", encodeURI(JSON.stringify(products)));
    cart();
})


$("body").on("click", ".remove-page-cart", function() {
    var products = JSON.parse(decodeURI(localStorage.getItem("cart")));
    products.map((value, index) => {
        if (value.title == $(this).parents("tr").find(".product-name").find("a").text()) {
            products.splice(index, 1);
        }
    })
    localStorage.setItem("cart", encodeURI(JSON.stringify(products)));
    cart();
})

/*-------details page------------ */
$("body").on("click", ".buy-details", function() {
    let title = $(".pro__detl__title").text().trim();
    let price = $(".pro__dtl__prize").find("li:eq(1)").text();
    let img = $(".getimg").find("img").attr("src");
    let quantity = $(".cart-plus-minus-box").val();
    let url = $(".ht__bradcaump__area").find("a").attr("href");
    img = img.slice(img.lastIndexOf("/"), img.length);

    var products = JSON.parse(decodeURI(localStorage.getItem("cart")));
    var sanpham = JSON.parse(`{"title":"${title}","price":"${price}","url":"${url}", "img":"images/product${img}", "quantity": "${quantity}"}`);

    var check = true;
    products.map(value => {
        if (value.title == sanpham.title) {
            value.quantity = parseInt(value.quantity) + parseInt(sanpham.quantity);
            check = false;
        }
    });
    if (check) products.push(sanpham);

    if (products == "") {
        products.push(sanpham);
    }
    localStorage.setItem("cart", encodeURI(JSON.stringify(products)));
    window.top.location.href = "cart.html"
});

$("body").on("click", ".add-details", function() {
    let title = $(".pro__detl__title").text().trim();
    let price = $(".pro__dtl__prize").find("li:eq(1)").text();
    let img = $(".getimg").find("img").attr("src");
    let quantity = $(".cart-plus-minus-box").val();
    let url = $(".ht__bradcaump__area").find("a").attr("href");
    img = img.slice(img.lastIndexOf("/"), img.length);

    var products = JSON.parse(decodeURI(localStorage.getItem("cart")));
    var sanpham = JSON.parse(`{"title":"${title}","price":"${price}","url":"${url}", "img":"images/product${img}", "quantity": "${quantity}"}`);

    var check = true;
    products.map(value => {
        if (value.title == sanpham.title) {
            value.quantity = parseInt(value.quantity) + parseInt(sanpham.quantity);
            check = false;
        }
    });
    if (check) products.push(sanpham);

    if (products == "") {
        products.push(sanpham);
    }
    localStorage.setItem("cart", encodeURI(JSON.stringify(products)));
    cart();
});

/*-------cart page------------ */

$("body").on("input", ".product-quantity", function() {
    let title = $(this).parents("tr").find(".product-name").find("a").text().trim();
    let total = $(this).parents("tr").find(".product-subtotal");
    let quantity = $(this).find("input").val();
    let TongTien = 0;
    var products = JSON.parse(decodeURI(localStorage.getItem("cart")));
    products.map(value => {
        if (quantity < 1) {
            $(this).find("input").val(1);
            quantity = 1;
        }
        if (value.title.trim() == title) {
            value.quantity = parseInt(quantity);
            let subtotal = handervnd(value.price, value.quantity)
            total.html(`${subtotal.toLocaleString('de-DE')} đ`);
        }
        let subtotal = handervnd(value.price, value.quantity)
        TongTien += parseInt(subtotal);
        $(".cart_totals").find(".amount").html(`${TongTien.toLocaleString('de-DE')} đ`);
    });


    // console.log(total)
    localStorage.setItem("cart", encodeURI(JSON.stringify(products)));

});
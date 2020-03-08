$(function () {
    var storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
        storage = [];
    }
    $('.item-count').text(storage.length)

    for (var i = 0; i < storage.length; i++) {
        $('p:contains(' + storage[i].name + ')').parent().find('.item-quantity').val(getItemCount(storage[i].name))
    }



    $(document).on('click', '.add-btn', function (e) {
        e.preventDefault();
        var itemName = $(this).parent().find('p').text();
        var maxcount = $(this).parent().attr('data-max');
        if (getItemCount(itemName) < maxcount) {
            var data = { name: itemName, max: maxcount };
            storage.push(data);
            localStorage.setItem("cart", JSON.stringify(storage));

            $(this).parent().find('.item-quantity').val(getItemCount(itemName))
            $('.item-count').text(storage.length)
            generateCart()
        }
    })

    $(document).on('click', '.remove-btn', function (e) {
        e.preventDefault();
        var itemName = $(this).parent().find('p').text();
        for (var i = 0; i < storage.length; i++) {
            var obj = storage[i];

            if (itemName.indexOf(obj.name) !== -1) {
                storage.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("cart", JSON.stringify(storage));
        $(this).parent().find('.item-quantity').val(getItemCount(itemName))


        $('.item-count').text(storage.length);
        generateCart()
    })

    function getItemCount(itemName) {
        var count = 0;
        for (var i = 0; i < storage.length; i++) {
            var obj = storage[i];

            if (itemName.indexOf(obj.name) !== -1) {
                count++;
            }
        }
        return count;

    }


    function generateCart() {
        var lookup = {};
        var items = storage;
        var result = [];

        for (var item, i = 0; item = items[i++];) {
            var name = item.name;
            var max = item.max

            if (!(name in lookup)) {
                lookup[name] = 1;
                result.push({ name: name, max: max });
            }
        }
        $(".cart").html('')
        for (var i = 0; i < result.length; i++) {
            $(".cart").append("<div data-max=" + result[i].max + ">\
                <p>" + result[i].name + "</p>\
                <a class='add-btn btn'>+</a>\
                <input type='text' class='cart-item-quantity' value='" + getItemCount(result[i].name) + "'>\
                <a class='remove-btn btn'>-</a>\
            </div>")
        }
    }
    generateCart();
})
// https://jessypeck.github.io/coffee-orders/orders.json

var $orderList = $('#orderList'); // id of target ul in html

$(function(){

// Get Orders
    $.ajax({
        type: 'GET',
        url: 'https://jessypeck.github.io/coffee-orders/orders.json',
        success: function(orders){
            $.each(orders, function(i, order){
                addOrderToList(order);    
            });

        }
    })
})

function addOrderToList(order){
    var newListEntry = "<li>Name: " + order.name + " , Order: " + order.drink + "</li>";
    $orderList.append(newListEntry);
}


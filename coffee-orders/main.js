// https://jessypeck.github.io/coffee-orders/orders.json

$(function(){

    $.ajax({
        type: 'GET',
        url: 'orders',
        success: function(data){
            console.log('success', data);
        }
    })
})


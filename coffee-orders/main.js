// https://jessypeck.github.io/coffee-orders/orders.json

console.log('Javascript is working!');

$(function(){

    $.ajax({
        type: 'GET',
        url: 'orders',
        success: function(data){
            console.log('success', data);
        }
    })
})


// https://jessypeck.github.io/coffee-orders/orders.json

var $orderList = $('#orderList'); // ul where orders are shown
var $nameInput = $('#nameInput'); // ul where orders are shown
var $drinkInput = $('#drinkInput'); // ul where orders are shown

var names = ['Alice','Betty','Carlos','Daisuke','Enrqiue','Felicity',
'Greta','Horatio','Ingrid','Junko','Karl','Luna','Momoko','Nora','Oscar','Petra',
'John','Pete','Alex','Christina','Alison','Sarah','Veronica','Archie'];

var drinks = ['Mocha','Chai Tea','Green Tea','Black Tea','Oolong Tea',
'Latte','Chai Latte','Caramel Frappe','White Mocha','Americano','Espresso',
'Cocoa','Skinny Latte','Iced Tea','Coffee','Cold Brewed Coffee'];


$(function(){
// Get Orders
    $.ajax({
        type: 'GET',
        url: 'orders.json',
        success: function(orders){
            $.each(orders, function(i, order){
                addOrderToList(order.name, order.drink);    
            });

        },
        error: function(){
            altert("Error, problem getting orders.");
        }
    })
})

//On Click "Submit" Button
$('#addOrderBtn').on('click', function(){
    console.log("Click!");
    var newOrder = submitOrder();
    addOrderToList(newOrder.name, newOrder.drink);
});

// Makes new Order from info in submit boxes
function submitOrder(){
    var newOrder = {
        name : $nameInput.val(),
        drink : $drinkInput.val()
    };
    return newOrder;
}

// Post Order to Database
// NOT ACTIVE, need API ////////////
function postOrder(newOrder){
    $.ajax({
        type: 'POST',
        url: 'https://jessypeck.github.io/coffee-orders/orders.json',
        data: newOrder,
        success: addOrderToList(newOrder.name.stringify(), newOrder.drink),
        error: function(){
            altert("Error, problem submiting order.");
        }
    });
}

// Adds order info to Html unordered list
function addOrderToList(name, drink){
    var newListEntry = "<li>Name: " + name + ", Order: " + drink + "</li>";
    $orderList.append(newListEntry);
}

//On Click "New Order" Button
$('#rndOrderBtn').on('click', function(){
    addRandomOrder();
});

function addRandomOrder(){
    var newName = names[Math.floor(Math.random()*names.length)];
    var newDrink = drinks[Math.floor(Math.random()*drinks.length)];
    addOrderToList(newName, newDrink);
}


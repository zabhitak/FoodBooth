var User = require("../user/User")
var Order = require("./Order")
const keys = require('../../keys');
const Secret_Key = keys.Secret_Key;

const stripe = require('stripe')(Secret_Key) 


placeOrder = async (req,res) => {
    const userId = req.user.id
    try {
        var user = await User.findById(userId)

        var products = user.cart

        var restaurant = await User.findById(products[0].user)

        var { totalCost } = user

        var newOrder = await Order.create({ customer : user , products,totalCost ,restaurant })

        user.currentOrder = newOrder

        if(user.orders.length > 10){
            user.orders = user.orders.slice(0,10) // max 10 orders at a time
        }

        user.orders.unshift(newOrder)

        user.cart = []

        user.totalCost = 0

        var savedUser = await user.save()

        var updatedUser = await User.findByIdAndUpdate(userId,savedUser)


        stripe.customers.create({ 
            email: req.body.stripeEmail, 
            source: req.body.stripeToken, 
            name: 'Gautam Sharma', 
            address: { 
                line1: 'TC 9/4 Old MES colony', 
                postal_code: '110092', 
                city: 'New Delhi', 
                state: 'Delhi', 
                country: 'India', 
            } 
        }) 
        .then((customer) => { 
    
            return stripe.charges.create({ 
                amount: 7000,    // Charing Rs 25 
                description: 'Web Development Product', 
                currency: 'USD', 
                customer: customer.id 
            }); 
        }) 
        .then((charge) => { 
            res.send("Success") // If no error occurs 
            console.log(charge)
        }) 
        .catch((err) => { 
            res.send(err)    // If some error occurs 
        }); 

        
        req.flash("success","Order placed successfully")
        res.redirect("/index")

    } catch (error) {
        console.log(error)
        req.flash("error","Cannot place order right now")
        res.redirect("/myCart")
    }
}
module.exports = placeOrder



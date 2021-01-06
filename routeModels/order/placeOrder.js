var User = require("../user/User")
var Order = require("./Order")
var Admin = require("../admin/Admin")
const keys = require('../../keys');

const nodemailer = require("nodemailer")

const user = process.env.EMAIL_ID 
const pass = process.env.PASSWORD

const auth = {
    user ,
    pass  
}

const Secret_Key = keys.Secret_Key;

const stripe = require('stripe')(Secret_Key) 


placeOrder = async (req,res) => {
    const userId = req.user._id
    try {
        var user = await User.findById(userId).populate({
            path : 'cart',
            populate : {
              path : 'product',
              model : "Product",
            }
          })
          
        var products = user.cart
        var adminId = products[0].product.user
        var admin = await Admin.findById(adminId)

        var { totalCost } = user

        var newOrder = await Order.create({ customer : user , products,totalCost ,restaurant : admin })

        user.currentOrder = newOrder

        if(user.orders.length > 10){
            user.orders = user.orders.slice(0,10) // max 10 orders at a time
        }

        user.orders.unshift(newOrder)

        user.cart = []

        user.totalCost = 0

        var savedUser = await user.save()

        var updatedUser = await User.findByIdAndUpdate(userId,savedUser)

        admin.currentOrders.unshift(newOrder)

        await admin.save()

        stripe.customers.create({ 
            email: req.body.stripeEmail, 
            source: req.body.stripeToken, 
            name: user.username, 
            address: user.address
        }) 
        .then((customer) => { 
            return stripe.charges.create({ 
                amount: totalCost,    // Charing Rs 25 
                description: 'Web Development Product', 
                currency: 'USD', 
                customer: customer.id 
            });  
        }) 
        const eventEmitter = req.app.get('eventEmitter')
        var data = {
            username : req.user.username,
            phoneNumber : req.user.phoneNumber,
            totalCost : totalCost,
            address : req.user.address
        }  
        eventEmitter.emit('orderPlaced', data)

        const smtpTrans = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth 
        })
        
        const mailOpts = {
            from: "Natto",
            to : user.email,
            subject: 'Natto | Order Accepted',
            text: `Hi, ${ user.username }` + "\n\n" + 
            `Your order has been accepted. Total cost of your order is ${totalCost}`
            + "\n\n" + 
            "Regards,\n" +
            "Team ,Natto"
        }

        var response = await smtpTrans.sendMail(mailOpts)

        req.flash("success","Order placed successfully")
        res.redirect("/index")

    } catch (error) {
        console.log(error)
        req.flash("error","Cannot place order right now")
        res.redirect("/index")
    }
}
module.exports = placeOrder


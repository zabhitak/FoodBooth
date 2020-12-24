const pdfDocument = require('pdfkit');
const Order = require('./Order');
const path = require("path")
const fs = require("fs");

getInvoice = (req, res, next) => {
    const { orderId } = req.params ;
    
    Order.findById(orderId).populate("products")
      .then((order) => {
        if (!order) {
          req.flash("error","You dont have any order placed")
          res.redirect("/index")
        }
        
        if (order.user.toString() != req.user.id.toString()) {
          res.redirect("/index")
          return
        }
        const invoiceName = 'invoice-' + orderId + '.pdf';
        const invoicePath = path.join('data', 'invoices', invoiceName);
  
        const pdfDoc = new pdfDocument();
  
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
          'Content-Disposition',
          'inline; filename= "' + invoiceName + '"'
        );
  
        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);
  
        pdfDoc.fontSize(26).text('Invoice'),
          {
            underline: true,
          };
  
        pdfDoc.text('---------------------');
        let { totalCost } = order;
        order.products.forEach((product) => {
          // totalCost = totalCost + prod.quantity * prod.product.price;
          pdfDoc
            .fontSize(14)
            .text(
              product.title +
                ' -- ' +
                product.price +
                '+' +
                product.deliveryCharge
            );
        });
        pdfDoc.text('-----------');
        pdfDoc.fontSize(20).text('Total Price $' + totalCost);
        pdfDoc.end();
      })
      .catch(err => {
        console.log(err)
        req.flash("error","Can not get your invoice right now")
        res.redirect("/index")
      });
  };

  module.exports = getInvoice
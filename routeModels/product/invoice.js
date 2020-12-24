const pdfDocument = require('pdfkit');
const Order = require('../models/order');

getInvoice = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
      .then((order) => {
        if (!order) {
          return next(new Error('No order found'));
        }
  
        if (order.user.userId.toString() !== req.user._id.toString()) {
          return next(new Error('No order found'));
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
        let totalPrice = 0;
        order.products.forEach((prod) => {
          totalPrice = totalPrice + prod.quantity * prod.product.price;
          pdfDoc
            .fontSize(14)
            .text(
              prod.product.title +
                ' -- ' +
                prod.quantity +
                'x' +
                '$' +
                prod.product.price
            );
        });
        pdfDoc.text('-----------');
        pdfDoc.fontSize(20).text('Total Price $' + totalPrice);
        pdfDoc.end();
      })
      .catch((err) => next(err));
  };

  module.exports = getInvoice
const pdfDocument = require('pdfkit');
const Order = require('./Order');
const path = require('path');
const fs = require('fs');
const User = require("../user/User")

function generateHr(doc, y) {
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return '$' + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + '/' + month + '/' + day;
}

function generateTableRow(doc, y, item, unitCost, lineTotal) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(unitCost, 280, y, {width: 90, align: 'right'})
    .text(lineTotal, 0, y, {align: 'right'});
}

getInvoice = async (req, res, next) => {
  const {orderId} = req.params;
  try {
    Order.findById(orderId).populate({
      path : 'products',
      populate : {
        path : 'product',
        model : "Product"
      }
    })
    .then( async (order) => {
      if (!order) {
        req.flash('error', 'You dont have any order placed');
        res.redirect('/index');
      }

      if (order.customer.toString() != req.user._id.toString()) {
        res.redirect('/index');
        return;
      }

      var {totalCost , customer } = order;

      customer = await User.findById(customer)

      const invoiceName = 'invoice-' + orderId + '.pdf';
      const invoicePath = path.join('data', 'invoices', invoiceName);
      const image = path.join(__dirname, './logo.png');
      const pdfDoc = new pdfDocument({size: 'A4', margin: 50});

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'inline; filename= "' + invoiceName + '"'
      );

      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);

      pdfDoc
        .image(image, 50, 45, {width: 50})
        .fillColor('#444444')
        .fontSize(20)
        .text('ACME Inc.', 110, 57)
        .fontSize(10)
        .text('ACME Inc.', 200, 50, {align: 'right'})
        .text('123 Main Street', 200, 65, {align: 'right'})
        .text('New York, NY, 10025', 200, 80, {align: 'right'})
        .moveDown();

      pdfDoc.fillColor('#444444').fontSize(20).text('Invoice', 50, 160);

      generateHr(pdfDoc, 185);
      const customerInformationTop = 200;

      pdfDoc
        .fontSize(10)
        .text('Invoice Number:', 50, customerInformationTop)
        .font('Helvetica-Bold')
        .text('invoice.invoice_nr', 150, customerInformationTop)
        .font('Helvetica')
        .text('Invoice Date:', 50, customerInformationTop + 15)
        .text(formatDate(new Date()), 150, customerInformationTop + 15)
        .text('Balance Due:', 50, customerInformationTop + 30)
        .text(formatCurrency(totalCost), 150, customerInformationTop + 30)
        .font('Helvetica-Bold')
        .text(customer.username.toString(), 300, customerInformationTop)
        .font('Helvetica')
        .text(customer.address.toString(), 300, customerInformationTop + 15)
        .moveDown();

      generateHr(pdfDoc, 185);

      let i = 0;
      const invoiceTableTop = 330;

      pdfDoc.font('Helvetica-Bold');
      generateTableRow(
        pdfDoc,
        invoiceTableTop,
        'Item',
        'Quantity',
        'Unit Cost',
        'Line Total'
      );
      generateHr(pdfDoc, invoiceTableTop + 20);
      pdfDoc.font('Helvetica');

      order.products.forEach((eachProduct) => {
        var {product} = eachProduct
        const position = invoiceTableTop + (i + 1) * 30;
        i++;
        generateTableRow(
          pdfDoc,
          position,
          product.title,
          eachProduct.quantity,
          product.deliveryCharge + " + " + product.price,
          eachProduct.quantity + "*(" + product.deliveryCharge + " + " + product.price + ")"
        );

        generateHr(pdfDoc, position + 20);
      });

      var position = invoiceTableTop + (i + 1) * 30;
      
      generateTableRow(
        pdfDoc,
        position,
        "",
        "Total",
        "$ " + totalCost
      );

      generateHr(pdfDoc, position + 20);

      pdfDoc.end();
    }).catch((err) => {
      console.log(err);
      req.flash('error', 'Can not get your invoice right now');
      res.redirect('/index');
    });
  } catch (err) {
    console.log(err)
    req.flash("error","Cannot get your invoice right now")
    res.redirect("/index")
  }
  
};

module.exports = getInvoice;

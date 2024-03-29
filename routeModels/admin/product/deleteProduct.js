var Admin = require("../Admin")
const Product = require("./Product")
const fileHelper = require('../../../util/file');

postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndDelete(prodId)

    .then((product) => {
      product.images.forEach(element => {
        fileHelper.deleteFile(element);
      });
 
      req.flash("success","Product deleted successfully")
      res.redirect('/admin/index');
    })
    .catch((err) => {
      req.flash("error","Cannot delete product right now")
      res.redirect("/admin/index")
    });
};

module.exports = postDeleteProduct
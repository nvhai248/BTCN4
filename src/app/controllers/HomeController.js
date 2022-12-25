const userM = require('../models/user');
const { randomInt } = require('crypto');

class LogController {
    //[GET] /
    start(req, res, next) {
        res.redirect('/1');
    }

    //[GET] /:id
    async interface(req, res, next) {
        const categories = await userM.allCategory();
        const products = await userM.searchProductByCatID(req.params.id);

        res.render('home', {
            product: products,
            categories: categories,
            addCart: `<a name="" id="addCart" class="mb-3" href="#" role="button">Add to cart</a>`,
        })
    }

    //[GET] /cart
    async cart(req, res, next) {
        const categories = await userM.allCategory();
        const products = await userM.searchProductInOrder();

        res.render('home', {
            product: products,
            categories: categories,
        })
    }

    //[POST] /add/OrderDetails
    async addOrder(req, res, next) {
        console.log(req.body);
    }
}

module.exports = new LogController();
const initOptions = {};
const pgp = require('pg-promise')(initOptions);
const cn = require('../../configs/cnStr');
// connect to db
const db = pgp(cn);

module.exports = {
    searchPriceByID: async (id) => {
        const rs = await db.one('SELECT "UnitPrice" FROM public."Products" WHERE "ProductID" = $1 RETURNING *', [id]);
        return rs;
    },

    searchProductInOrder: async () => {
        const rs = await db.any('SELECT * FROM public."Order Details"');
        return rs;
    },

    addOrder: async (u) => {
        const rs = await db.one('INSERT INTO public."Order Details" VALUES ($1, $2, $3, $4) RETURNING *',
            [u.OrderID, u.ProductID, u.UnitPrice, u.Quantity]);
        return rs;
    },

    allCategory: async () => {
        const rs = await db.any('SELECT * FROM public."Categories"');
        return rs;
    },

    searchCustomerByToken: async (token) => {
        const rs = await db.one('SELECT * FROM public."Customers" WHERE "Token" = $1 RETURNING *', [token]);
        return rs;
    },

    allUserID: async () => {
        const rs = await db.any('SELECT "UserID" FROM public."Users"');
        return rs;
    },

    addCus: async (u) => {
        const rs = await db.one('INSERT INTO public."Customers" VALUES ($1, $2, $3) RETURNING *',
            [u.CusID, u.CustomerName, u.Token]);
        return rs;
    },

    allProducts: async () => {
        const rs = await db.any('SELECT * FROM public."Products"');
        return rs;
    },

    addUser: async u => {
        const rs = await db.one('INSERT INTO public."Users" VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [u.UserID, u.Username, u.Password, u.FullName, u.Token, u.Address]);
        return rs;
    },

    SearchUserByUsername: async username => {
        const rs = await db.one('SELECT * FROM public."Users" WHERE "Username" = $1', [username]);
        return rs;
    },

    searchProductByCatID: async (id) => {
        const rs = await db.any('SELECT * FROM public."Products" WHERE "CategoryID" = $1', [id]);
        return rs;
    },

    addProduct: async u => {
        const rs = await db.one('INSERT INTO public."Products" VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [u.ProductID, u.ProductName, u.CategoryID, u.UnitPrice, u.UnitslnStock]);
        return rs;
    },

    deleteProduct: async id => {
        await db.one('DELETE FROM public."Products" WHERE "ProductID" = $1', [id]);
    },
}
import { Router } from "express";
import ProductsManager from '../dao/manager/productsManager.js';

const router = Router();
const productManager = new ProductsManager();

//accesos publicos y privados con middlewares
const publicAccess = (req, res, next) => {
  if (req.session.user) return res.redirect("/api/products");
  next();
};

const privateAccess = (req, res, next) => {
  if (!req.session.user) return res.redirect("/login");
  next();
};
router.get("/register", publicAccess, (req, res) => {
  res.render("register");
});

router.get("/login", publicAccess, (req, res) => {
  res.render("login");
});

router.get("/", privateAccess, (req, res) => {
  res.render("login", {
  });
});

// router.get('/products', privateAccess, async (req, res) => {
//   const { limit = 10, page = 1, query = false, sort } = req.query;
//   console.log(req.session.user);

//   if (sort) {
//       if (sort !== 'desc' && sort !== 'asc') {
//           return res.render('products', { status: 'error', error: 'This sort no exist' });
//       };
//   };

//   try {
//       const ProductsManager = await productManager.getAll(limit, page, query, sort);

//       if (page > ProductsManager.totalPages || page <= 0) {
//           return res.render('products', { status: 'error', error: 'This page no exist' });
//       };

//       const url = '/products?'
//       ProductsManager.prevLink = ProductsManager.hasPrevPage ? `${url}page=${ProductsManager.prevPage}` : null;
//       ProductsManager.nextLink = ProductsManager.hasNextPage ? `${url}page=${ProductsManager.nextPage}` : null;
      
//       res.render('products', {ProductsManager, user: req.session.user});

//   } catch (error) {
//      res.render('products' , { status: 'error', error });
//   };
// });

export default router;

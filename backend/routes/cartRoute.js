import express from 'express';
import { addCartProduct , removeCartProduct , findCartProducts , updateCartProduct} from '../controllers/CartController.js';
import { isUser } from '../middlewares/isAuth.js';

const router = express.Router();

router.post("/add",isUser,addCartProduct);
router.get("/find",isUser,findCartProducts);
router.put("/update",isUser,updateCartProduct);
router.delete("/remove/:id",isUser,removeCartProduct);

export default router;
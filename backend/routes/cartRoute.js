import express from 'express';
import { addCartProduct , removeCartProduct , findCartProducts , updateCartProduct} from '../controllers/CartController.js';


const router = express.Router();

router.post("/add",addCartProduct);
router.get("/find",findCartProducts);
router.put("/update",updateCartProduct);
router.delete("/remove",removeCartProduct);

export default router;
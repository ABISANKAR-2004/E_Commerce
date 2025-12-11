import express from 'express';
import { getAllProducts , findProduct ,createProduct ,deleteProduct, updateProduct} from '../controllers/ProductController.js';
import { isAdmin  } from '../middlewares/isAuth.js';
const router = express.Router();

router.post("/create",isAdmin,createProduct);
router.post("/findone",findProduct);
router.get("/products",getAllProducts);
router.put("/updateproduct",isAdmin,updateProduct);
router.delete("/delete",isAdmin,deleteProduct);

export default router;
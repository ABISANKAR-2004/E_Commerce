import express from 'express';
import { getAllProducts , findProduct ,createProduct ,deleteProduct, updateProduct} from '../controllers/ProductController.js';

const router = express.Router();

router.post("/create",createProduct);
router.post("/findone",findProduct);
router.get("/products",getAllProducts);
router.put("/updateproduct",updateProduct);
router.delete("/delete",deleteProduct);

export default router;
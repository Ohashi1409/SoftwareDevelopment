import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/multer";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";

import { AddItemController } from "./controllers/order/AddItemController";
import { DeleteItemController } from "./controllers/order/DeleteItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- Rotas USER -- 

router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

router.get("/userinfo", isAuthenticated, new DetailUserController().handle);

// -- Rotas CATEGORY -- 

router.post("/category", isAuthenticated, new CreateCategoryController().handle);

router.get("/categories", isAuthenticated, new ListCategoryController().handle);

// -- Rotas Product -- 

router.post("/product", isAuthenticated, upload.single("file"), new CreateProductController().handle);

router.get("/category/product", isAuthenticated, new ListByCategoryController().handle);

// -- Rotas ORDER -- 

router.post("/order", isAuthenticated, new CreateOrderController().handle);

router.delete("/removeOrder", isAuthenticated, new DeleteOrderController().handle) 

router.post("/order/add", isAuthenticated, new AddItemController().handle)

router.delete("/order/delete", isAuthenticated, new DeleteItemController().handle)

router.put("/order/send", isAuthenticated, new SendOrderController().handle);

router.get("/orders", isAuthenticated, new ListOrderController().handle);

router.get("/order/detail", isAuthenticated, new DetailOrderController().handle)

router.put("/order/finish", isAuthenticated, new FinishOrderController().handle)

export { router };
// import router
const router = require('express').Router();

// import middleware
const apiKeyMiddleware = require('../middlewares/api-key');
const jwtMiddleware = require('../middlewares/jwt');

// import controller
const authController = require('../controllers/auth');
const todoController = require('../controllers/todo');

// route
// gunakan kata benda untuk penamaan alamat
router.post('/api/registration', apiKeyMiddleware, authController.register);
router.post('/api/login', apiKeyMiddleware, authController.login);

// gunakan kata jamak / plural pada penamaan resource  
router.get('/api/todos', jwtMiddleware, todoController.getAllTodo);
router.post('/api/todos', jwtMiddleware, todoController.createTodo);
router.get('/api/todos/:id', jwtMiddleware, todoController.getSingleTodo);
router.put('/api/todos/:id', jwtMiddleware, todoController.updateTodo);
router.delete('/api/todos/:id', jwtMiddleware, todoController.deleteTodo);

// export router
module.exports = router;
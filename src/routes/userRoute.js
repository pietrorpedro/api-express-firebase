import express from 'express'
import UserController from '../controllers/UserController.js'

const router = express.Router()

router
    .get('/users', UserController.listUsers)
    .get('/user/:id', UserController.listUser)
    .post('/user', UserController.createUser)
    .put('/user/:id', UserController.updateUser)
    .delete('/user/:id', UserController.deleteUser)

export default router
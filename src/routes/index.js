import express from 'express'
import users from './userRoute.js'

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).json('API INDEX')
    })

    app.use(
        express.json(), 
        users
    )
}

export default routes
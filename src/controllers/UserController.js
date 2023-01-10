import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore/lite'
import db from '../config/fireBaseDB.js'
import DataTemplate from '../templates/DataTemplate.js'

class UserController {

    static listUsers = async (req, res) => {
        const usersColletion = collection(db, 'users')
        const snapshot = await getDocs(usersColletion)
        const users = snapshot.docs.map(user => ({id: user.id, ...user.data()}))

        res.status(200).json(DataTemplate.return('OK', users, null))
    }

    static listUser = async (req, res) => {
        const id = req.params.id
        const userDoc = doc(db, 'users', id)
        const user = await getDoc(userDoc)

        res.status(200).json(DataTemplate.return('OK', user.data(), null))

    }

    static createUser = async (req, res) => {
        const name = req.body.name
        const email = req.body.email

        const usersColletion = collection(db, 'users')
        const user = await addDoc(usersColletion, {name, email})


        res.status(201).json(DataTemplate.return('OK', {name, email}, 'User created'))
    }

    static updateUser = async (req, res) => {
        const id = req.params.id
        const userDoc = doc(db, 'users', id)
        const user = await getDoc(userDoc)

        let nameTemp = user.data().name
        let emailTemp = user.data().email

        updateDoc(userDoc, {
            name: req.body.name === undefined || null ? nameTemp : req.body.name,
            email: req.body.email === undefined || null ? emailTemp : req.body.email
        })

        res.status(200).json(DataTemplate.return('OK', user.data(), 'User updated'))
    }

    static deleteUser = async (req, res) => {
        const id = req.params.id
        const userDoc = doc(db, 'users', id)
        await deleteDoc(userDoc)

        res.status(200).json(DataTemplate.return('OK', id, 'User deleted'))
    }
}

export default UserController
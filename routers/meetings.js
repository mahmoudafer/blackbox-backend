import '../config/config'
import { Router } from 'express'

import sendEmail from '../helpers/mail'

//MOCK database, as there is no need to persist meeting IDs and in-memory-speed is not needed (i.e redis)
const db = {
	id: 0,
	rooms: {}
}

const router = Router()

// Routes
router.post('/meet', async (req, res) => {
	const { name, peerID, email } = req.body
	if (!name || !peerID)
		return res.status(422).end()

	const { rooms, id } = db
	rooms[id] = { name, peerID }
	db.id++
	res.status(201).json({ id })

	if (email)
		sendEmail(name, email, id)
})

router.get('/meet/:id', async (req, res) => {
	const { id } = req.params
	if (!db.rooms[id])
		return res.status(404).end()

	res.status(200).json(db.rooms[id])
})


export default router
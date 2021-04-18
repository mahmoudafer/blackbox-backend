import './config/config'
import cors from 'cors'
import express from 'express'
import { ExpressPeerServer } from 'peer'

import meetingsRouter from './routers/meetings'

const app = express()

app.all('*', (req, res, next) => {
	console.log(req)
	next()
})
app.use(cors())
app.options('*', cors())
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(meetingsRouter)

app.get("/", (req, res) => {
	res.end('server running')
})

const server = app.listen(process.env.LISTENER_PORT, () => console.log(`Server running on port ${process.env.LISTENER_PORT}`))

const peerServer = ExpressPeerServer(server, {
	debug: 3
})

app.use('/peer', peerServer)
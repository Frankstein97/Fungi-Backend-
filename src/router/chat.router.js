import { Router } from 'express'

const chatRouter = Router()

chatRouter.get('/', async (req, res) => {
    res.render('message', {})
})

export default chatRouter
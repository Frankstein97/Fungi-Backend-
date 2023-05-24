import { Router } from 'express'

const indexRouter = Router()

indexRouter.get('/', async (req, res) => {
    res.render('index', {})
})

export default indexRouter
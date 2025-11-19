import { Router } from "express";
const router= Router()
import *as userService from './services/user.service.js'

router.post('/activities', userService.activity)

router.get('/activities', userService.list)

export default router
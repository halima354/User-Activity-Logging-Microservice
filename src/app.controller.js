import connectDB from './DB/connection.js'
import { startProducer, sendActivity } from './infrastructure/kafka/producer.js';
import { startConsumer } from './infrastructure/kafka/consumer.js';
import userController from './modules/user/user.controller.js'
import { globalErrorHandling } from './utils/response/error.response.js'
const bootstrap = async (app, express) => {

    app.use(express.json())
    app.get("/", (req, res, next) => {
        return res.status(200).json({ message: "Welcome in node.js project powered by express and ES6" })
    })

    app.use("/user", userController)

    app.all("*", (req, res, next) => {
        return res.status(404).json({ message: "In-valid routing" ,})
    })

    app.use(globalErrorHandling)

    await connectDB()

    app.locals.producer = { sendActivity }

    await startProducer()
    await startConsumer()
}

export default bootstrap



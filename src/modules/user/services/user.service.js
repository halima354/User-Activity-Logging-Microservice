import { asyncHandler } from "../../../utils/response/error.response.js";
import { successResponse } from "../../../utils/response/success.response.js";
import userModel  from "../../../DB/model/User.model.js";

import { pagination } from "../../../utils/pagination/pagination.js";

export const activity = asyncHandler(
        async (req, res, next) => {
    const activity = req.body;
    await req.app.locals.producer.sendActivity(activity)
    return successResponse({ res, message: "Activity sent to Kafka" });
}
)

export const list = asyncHandler(
    async (req, res, next) => {
        const { page, size, userId, from, to, action } = req.query
        let filter = {}
        if (userId) filter.userId = userId
        if (action) filter.action = action
        if (from || to) {
            filter.createdAt = {}
            if (from) filter.createdAt.$gte = new Date(from)
            if (to) filter.createdAt.$lte = new Date(to)
        }
        const { result, ...paginationDetails } = await pagination({
            model: userModel,
            page: page,
            size: size,
            filter: filter
        })
        return successResponse({res, data: { logs: result, pagination: paginationDetails }
        })
    }
)



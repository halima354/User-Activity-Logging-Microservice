
import mongoose,{ Schema, Types, model } from "mongoose";

const userSchema= new Schema({
    userId: { type: String, required: true, index: true },
    action: { type: String, required: true, index: true },
    metadata: Schema.Types.Mixed,
    
}
,{timestamps: true})
userSchema.index({ userId: 1, createdAt: -1 });
const userModel = mongoose.models.User || model("User", userSchema)
export default userModel

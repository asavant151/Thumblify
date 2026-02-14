import mongoose from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    creditBalance: number;
    plan: 'Free' | 'Go' | 'Plus' | 'Pro' | 'Team' | 'Enterprise';
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
    creditBalance: { type: Number, default: 5 },
    plan: { type: String, enum: ['Free', 'Go', 'Plus', 'Pro', 'Team', 'Enterprise'], default: 'Free' },
}, {
    timestamps: true,
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;

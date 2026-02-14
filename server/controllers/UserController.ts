import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";


// Controller to get All User Thumbnails
export const getUsersThumbnails = async(req: Request, res: Response) => {
    try {
        const {userId} = req.session;

        const thumbnail = await Thumbnail.find({userId}).sort({createAt: -1});
        res.json({thumbnail})
        

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

// Controllers to get single Thumbnail of a user
export const getThumbnailById = async(req: Request, res: Response) => {
    try {
        const {userId} = req.session;
        const {id} = req.params;
        
        const thumbnail = await Thumbnail.findOne({userId, _id: id});
        res.json({thumbnail});

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
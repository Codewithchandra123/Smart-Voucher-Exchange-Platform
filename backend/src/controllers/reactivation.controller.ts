import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ReactivationService } from "../services/reactivation.service";
import { ReactivationRequestModel } from "../models/ReactivationRequest";

/**
 * User submits request.
 * Note: This must bypass the suspension check, but require auth.
 */
export const submitReactivationHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.currentUser?._id.toString();
        if (!userId) return res.sendStatus(StatusCodes.UNAUTHORIZED);

        const { explanation, proofUrls } = req.body;
        if (!explanation) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Explanation is required" });
        }

        const request = await ReactivationService.submitRequest(userId, explanation, proofUrls || []);
        res.status(StatusCodes.CREATED).json(request);
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

export const listUserRequestsHandler = async (req: Request, res: Response) => {
    const userId = req.currentUser?._id;
    const requests = await ReactivationRequestModel.find({ user: userId }).sort({ createdAt: -1 });
    res.json(requests);
};

// Admin Handlers
export const listAllRequestsHandler = async (req: Request, res: Response) => {
    const requests = await ReactivationRequestModel.find()
        .populate("user", "displayName email")
        .sort({ status: 1, createdAt: -1 });
    res.json(requests);
};

export const reviewRequestHandler = async (req: Request, res: Response) => {
    try {
        const adminId = req.currentUser?._id.toString();
        if (!adminId) return res.sendStatus(StatusCodes.UNAUTHORIZED);

        const { requestId } = req.params;
        const { action, adminNote, penaltyAmount } = req.body;

        const request = await ReactivationService.reviewRequest(adminId, requestId, action, adminNote, penaltyAmount);
        res.json(request);
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

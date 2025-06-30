import { filterMiddleware, FilterList } from '../../src/middleware/filterMiddleware';
import { postFilterList } from '../../src/filters/postFilter';
import mongoose from 'mongoose';

let req = { query: {}, dbFilter: null } as any;
let res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
} as any;
beforeEach(() => {
    req.dbFilter = null;
});
describe("filterMiddleware function", () => {
    test("should return filter for fields with no operands defined", () => {
        req.query.author = "68600b2321b078541b943d5d";


        const nextFunction = jest.fn() as any;
        filterMiddleware(postFilterList)(req, res, nextFunction);
        expect(req.dbFilter).toMatchObject({ author: new mongoose.Types.ObjectId("68600b2321b078541b943d5d") });
    });
    test("should return error for id shorter/longer than 24", () => {
        req.query.author = "68600b2321b078541b943d5df";
        const nextFunction = jest.fn() as any;
        filterMiddleware(postFilterList)(req, res, nextFunction);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "input must be a 24 character hex string, 12 byte Uint8Array, or an integer" });
    });
    test("should return filter for fields with originalName, in, gte operand defined", () => {
        const req = {
            query: {
                createdAtFrom: "2025-06-09",
                createdAtTill: "2025-06-29"
            },
            dbFilter: null
        } as any;
        const res = {} as any;
        const nextFunction = jest.fn() as any;
        filterMiddleware(postFilterList)(req, res, nextFunction);
        expect(req.dbFilter).toMatchObject({
            createdAt: {
                $lte: "2025-06-29",
                $gte: "2025-06-09"
            }
        });
    })
})

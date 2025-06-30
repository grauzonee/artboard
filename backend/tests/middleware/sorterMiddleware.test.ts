import { sortMiddleware } from "../../src/middleware/sortMiddleware";
import { Post } from '../../src/models/Post';

let req = { query: {}, dbSort: null } as any;
let res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
} as any;
let nextFunction = jest.fn() as any;
beforeEach(() => {
    req.dbSort = null;
});

describe("sortMiddleware", () => {
    test("should sort is field is defined in getSortableFields", () => {
        req.query.sortByDesc = 'createdAt';
        sortMiddleware(Post)(req, res, nextFunction);
        expect(req.dbSort).toMatchObject({ createdAt: -1 });
    });
    test("should NOT sort is field is NOT defined in getSortableFields", () => {
        req.query.sortByDesc = 'title';
        sortMiddleware(Post)(req, res, nextFunction);
        expect(req.dbSort).toBe(null);
    });
    test("should rise an exception if both sortByAsc and sortByDesc are defined", () => {
        req.query.sortByDesc = 'title';
        req.query.sortByAsc = 'title';
        sortMiddleware(Post)(req, res, nextFunction);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "it is not possible to define sortByDesc and sortByAsc at the same time!" });
        expect(req.dbSort).toBe(null);
    })
})

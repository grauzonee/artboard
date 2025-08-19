import { like, getLikedPosts } from '@controllers/likeController';
import { Like } from '@models/Like';
jest.mock('@models/Post');
import { Post } from '@models/Post';

jest.mock('@models/Like');

describe('like controller', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        jest.resetAllMocks();
        req = {
            params: { id: 'postId123' },
            user: { _id: 'userId123' },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

    });

    it('should return 404 if post is not found', async () => {
        (Post.findById as jest.Mock).mockResolvedValue(null);

        await like(req, res);

        expect(Post.findById).toHaveBeenCalledWith('postId123');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ success: false, message: "Post was not found" });
    });

    it('should unlike a post if already liked', async () => {
        const existingLike = { deleteOne: jest.fn() };
        (Post.findById as jest.Mock).mockResolvedValue({ _id: 'postId123' });
        (Like.findOne as jest.Mock).mockResolvedValue(existingLike);
        (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

        await like(req, res);

        expect(existingLike.deleteOne).toHaveBeenCalled();
        expect(Post.findByIdAndUpdate).toHaveBeenCalledWith('postId123', { $pull: { likedBy: 'userId123' } });
        expect(res.json).toHaveBeenCalledWith({ success: true, liked: false });
    });

    it('should like a post if not already liked', async () => {
        (Post.findById as jest.Mock).mockResolvedValue({ _id: 'postId123' });
        (Like.findOne as jest.Mock).mockResolvedValue(null);
        (Like.create as jest.Mock).mockResolvedValue({});
        (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

        await like(req, res);

        expect(Like.create).toHaveBeenCalledWith({ userId: 'userId123', postId: 'postId123' });
        expect(Post.findByIdAndUpdate).toHaveBeenCalledWith('postId123', { $addToSet: { likedBy: 'userId123' } });
        expect(res.json).toHaveBeenCalledWith({ success: true, liked: true });
    });
});

describe('getLikedPosts controller', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
        jest.resetAllMocks();
        req = {
            user: { id: 'userId123' },
            query: { page: '2', limit: '5' },
            dbSort: { createdAt: -1 }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return liked posts successfully', async () => {
        const mockLikes = [{ postId: 'post1' }, { postId: 'post2' }];
        const mockPosts = { docs: [{ _id: 'post1' }, { _id: 'post2' }], totalDocs: 2 };

        (Like.find as jest.Mock).mockReturnValue({
            select: jest.fn().mockReturnThis(),
            lean: jest.fn().mockResolvedValue(mockLikes),
        });

        (Post.paginate as jest.Mock).mockResolvedValue(mockPosts);

        await getLikedPosts(req, res);

        expect(Like.find).toHaveBeenCalledWith({ userId: 'userId123' });
        expect(Post.paginate).toHaveBeenCalledWith(
            { _id: { $in: ['post1', 'post2'] } },
            {
                page: 2,
                limit: 5,
                sort: { createdAt: -1 },
                populate: 'author'
            }
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: mockPosts });
    });

    it('should handle empty likes gracefully', async () => {
        (Like.find as jest.Mock).mockReturnValue({
            select: jest.fn().mockReturnThis(),
            lean: jest.fn().mockResolvedValue([]),
        });

        (Post.paginate as jest.Mock).mockResolvedValue({ docs: [] });

        await getLikedPosts(req, res);

        expect(Post.paginate).toHaveBeenCalledWith(
            { _id: { $in: [] } },
            expect.any(Object)
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: { docs: [] } });
    });

    it('should default pagination values when query is missing', async () => {
        req.query = {}; // no page or limit

        (Like.find as jest.Mock).mockReturnValue({
            select: jest.fn().mockReturnThis(),
            lean: jest.fn().mockResolvedValue([{ postId: 'p1' }]),
        });

        (Post.paginate as jest.Mock).mockResolvedValue({ docs: [{ _id: 'p1' }] });

        await getLikedPosts(req, res);

        expect(Post.paginate).toHaveBeenCalledWith(
            { _id: { $in: ['p1'] } },
            {
                page: 1,
                limit: 1,
                sort: { 'createdAt': -1 },
                populate: 'author'
            }
        );
        expect(res.status).toHaveBeenCalledWith(200);
    });
});


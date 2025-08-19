import { like } from '@controllers/likeController';
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
        expect(Post.findByIdAndUpdate).toHaveBeenCalledWith('postId123', { $inc: { likesCount: -1 } });
        expect(res.json).toHaveBeenCalledWith({ success: true, liked: false });
    });

    it('should like a post if not already liked', async () => {
        (Post.findById as jest.Mock).mockResolvedValue({ _id: 'postId123' });
        (Like.findOne as jest.Mock).mockResolvedValue(null);
        (Like.create as jest.Mock).mockResolvedValue({});
        (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

        await like(req, res);

        expect(Like.create).toHaveBeenCalledWith({ userId: 'userId123', postId: 'postId123' });
        expect(Post.findByIdAndUpdate).toHaveBeenCalledWith('postId123', { $inc: { likesCount: 1 } });
        expect(res.json).toHaveBeenCalledWith({ success: true, liked: true });
    });
});


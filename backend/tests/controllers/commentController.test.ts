import { getComments, getCommentById, createComment, updateComment, deleteComment } from '@controllers/commentController';
import { Comment } from '@models/Comment';

jest.mock('../../src/models/Comment');

const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Comment Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getComments', () => {
        it('should return paginated comments', async () => {
            const req: any = { query: { page: 2, limit: 5 } };
            const res = mockResponse();
            const mockComments = [{ _id: '1' }, { _id: '2' }];
            (Comment.paginate as jest.Mock).mockResolvedValue(mockComments);

            await getComments(req, res);

            expect(Comment.paginate).toHaveBeenCalledWith({}, { page: 2, limit: 5, sort: {}, populate: 'author' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, data: mockComments });
        });
    });

    describe('getCommentById', () => {
        it('should return comment if found', async () => {
            const req: any = { params: { id: '1' } };
            const res = mockResponse();
            const mockComment = { _id: '1', content: 'test' };
            (Comment.findById as jest.Mock).mockReturnValue({ populate: jest.fn().mockResolvedValue(mockComment) });

            await getCommentById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, data: mockComment });
        });

        it('should return 404 if comment not found', async () => {
            const req: any = { params: { id: '1' } };
            const res = mockResponse();
            (Comment.findById as jest.Mock).mockReturnValue({ populate: jest.fn().mockResolvedValue(null) });

            await getCommentById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: "Comment not found" });
        });
    });

    describe('createComment', () => {
        it('should create a new comment', async () => {
            const req: any = { body: { content: 'hi', post: '1' }, user: { _id: 'user1' } };
            const res = mockResponse();
            const mockComment = { _id: '1', content: 'hi' };
            (Comment.create as jest.Mock).mockResolvedValue(mockComment);

            await createComment(req, res);

            expect(Comment.create).toHaveBeenCalledWith({ content: 'hi', post: '1', author: 'user1' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ success: true, data: mockComment });
        });

        it('should handle errors', async () => {
            const req: any = { body: { content: 'hi', post: '1' }, user: { _id: 'user1' } };
            const res = mockResponse();
            (Comment.create as jest.Mock).mockRejectedValue(new Error('Failed'));

            await createComment(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Failed' });
        });
    });

    describe('updateComment', () => {
        it('should update comment if found', async () => {
            const req: any = { params: { id: '1' }, body: { content: 'updated' }, user: { _id: 'user1' } };
            const res = mockResponse();
            const mockComment: any = { _id: '1', content: 'old', save: undefined as any };
            mockComment.save = jest.fn().mockResolvedValue(mockComment);
            (Comment.findOne as jest.Mock).mockResolvedValue(mockComment);

            await updateComment(req, res);

            expect(mockComment.content).toBe('updated');
            expect(mockComment.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should return 404 if comment not found', async () => {
            const req: any = { params: { id: '1' }, body: { content: 'updated' }, user: { _id: 'user1' } };
            const res = mockResponse();
            (Comment.findOne as jest.Mock).mockResolvedValue(null);

            await updateComment(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
        });
    });

    describe('deleteComment', () => {
        it('should delete comment if found', async () => {
            const req: any = { params: { id: '1' }, user: { _id: 'user1' } };
            const res = mockResponse();
            (Comment.findOneAndDelete as jest.Mock).mockResolvedValue(true);

            await deleteComment(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should return 500 if comment not deleted', async () => {
            const req: any = { params: { id: '1' }, user: { _id: 'user1' } };
            const res = mockResponse();
            (Comment.findOneAndDelete as jest.Mock).mockResolvedValue(null);

            await deleteComment(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
});


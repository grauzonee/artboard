import mongoose, { Document, Model, Schema } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { mongoosePagination } from '../../src/plugins/paginate';
import { PaginationResult } from 'types/pagination';

interface ITest extends Document {
    name: string;
    value: number;
    createdAt?: Date;
}

interface ITestModel extends Model<ITest> {
    paginate(
        filter?: Record<string, any>,
        options?: any
    ): Promise<PaginationResult<ITest>>;
}
describe('Mongoose Pagination Plugin', () => {
    let mongoServer: MongoMemoryServer;
    let TestModel: ITestModel;
    let testDocs: ITest[];

    beforeAll(async () => {
        // Create in-memory MongoDB server
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);

        // Create test schema and model
        const testSchema = new Schema<ITest, ITestModel>({
            name: { type: String, required: true },
            value: { type: Number, required: true }
        }, { timestamps: true });
        // Apply pagination plugin
        testSchema.plugin(mongoosePagination);
        TestModel = mongoose.model<ITest, ITestModel>('Test', testSchema);

        // Insert test data
        testDocs = await TestModel.insertMany([
            { name: 'First', value: 10 },
            { name: 'Second', value: 20 },
            { name: 'Third', value: 30 },
            { name: 'Fourth', value: 40 },
            { name: 'Fifth', value: 50 },
            { name: 'Sixth', value: 60 },
            { name: 'Seventh', value: 70 },
            { name: 'Eighth', value: 80 },
            { name: 'Ninth', value: 90 },
            { name: 'Tenth', value: 100 }
        ]);
    });
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await TestModel.deleteMany({});
        await TestModel.insertMany(testDocs);
    });
    describe('Basic Pagination', () => {
        it('should return default pagination (page 1, limit 10)', async () => {
            const result = await TestModel.paginate();

            expect(result).toMatchObject({
                docs: expect.any(Array),
                total: 10,
                page: 1,
                limit: 10,
                pages: 1,
                hasNext: false,
                hasPrev: false
            });
            expect(result.docs).toHaveLength(10);
        });
        it('should paginate with custom page and limit', async () => {
            const result = await TestModel.paginate({}, { page: 2, limit: 3 });

            expect(result).toMatchObject({
                total: 10,
                page: 2,
                limit: 3,
                pages: 4,
                hasNext: true,
                hasPrev: true
            });
            expect(result.docs).toHaveLength(3);
            expect(result.docs[0].name).toBe('Fourth');
        });

        it('should return empty array when page exceeds total pages', async () => {
            const result = await TestModel.paginate({}, { page: 5, limit: 3 });

            expect(result.docs).toHaveLength(0);
            expect(result.hasNext).toBe(false);
        });
    });
    describe('Filtering', () => {
        it('should apply filters correctly', async () => {
            const result = await TestModel.paginate(
                { value: { $gt: 50 } },
                { limit: 10 }
            );

            expect(result.total).toBe(5);
            expect(result.docs).toHaveLength(5);
            expect(result.docs[0].value).toBeGreaterThan(50);
        });
    });
    describe('Edge Cases', () => {
        it('should handle empty collection', async () => {
            await TestModel.deleteMany({});
            const result = await TestModel.paginate();

            expect(result.total).toBe(0);
            expect(result.docs).toHaveLength(0);
            expect(result.pages).toBe(0);
        });

        it('should handle invalid page/limit values', async () => {
            const result1 = await TestModel.paginate({}, { page: -1, limit: -5 });
            expect(result1.page).toBe(1);
            expect(result1.limit).toBe(1);
            const result2 = await TestModel.paginate({}, { page: 'invalid', limit: 'invalid' });
            expect(result2.page).toBe(1);
            expect(result2.limit).toBe(1);
        });
    });

});

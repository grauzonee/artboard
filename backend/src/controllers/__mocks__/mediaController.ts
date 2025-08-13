export const deleteImage = jest.fn().mockResolvedValue(true)
export const checkImage = jest.fn().mockResolvedValue(false)
export const sanitizeImageUrl = jest.fn((arg) => arg);

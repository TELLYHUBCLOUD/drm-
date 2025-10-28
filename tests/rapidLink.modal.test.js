const { response: modalResponse } = require('../src/modals/rapidLink.modal');
const { multiLinkDownloader } = require('../src/helpers/utility');

// Mock the multiLinkDownloader function to avoid actual downloads
jest.mock('../src/helpers/utility', () => ({
    multiLinkDownloader: jest.fn((links) => Promise.resolve(links)),
}));

describe('rapidLink.modal', () => {
    it('should correctly parse comma-separated links', async () => {
        const interaction = {
            deferReply: jest.fn(),
            followUp: jest.fn(),
            fields: {
                fields: {
                    first: () => ({
                        value: 'http://example.com/file1.zip,http://example.com/file2.zip',
                    }),
                },
            },
            user: {
                id: '12345',
            },
        };

        await modalResponse(interaction);

        expect(multiLinkDownloader).toHaveBeenCalledWith([
            'http://example.com/file1.zip',
            'http://example.com/file2.zip',
        ]);
    });
});

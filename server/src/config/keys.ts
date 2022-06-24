const ClientURL = process.env.CLIENT_URL || 'http://localhost:3000';

const keys = {
    MongoURI: process.env.MONGODB_URI || '',
    ClientURL,
    ClientRedirectURL: `${ClientURL}`,
};

export default keys;

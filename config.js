module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.URL ||  'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://fm12345:fm12345@fernando-k3gdt.mongodb.net/test?retryWrites=true&w=majority'
}
const config = {
    secret: "cmpe273_secret_key",
    frontendURL: "http://localhost:3000",
    mongoURI:  process.env.PROD ? `mongodb+srv://273:273@sample.zj00c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`:`mongodb+srv://273:273@sample.zj00c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
};

module.exports = config;

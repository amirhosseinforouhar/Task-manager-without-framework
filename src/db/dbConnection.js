const mongoose = require("mongoose");

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected To MongoDB");
    } catch (error) {
        console.log(error);
        process.exit()
    }
};
module.exports = connectToMongoDB; 
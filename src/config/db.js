const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB);
        console.log(`Database connected connect : ${connect?.connection?.host}, ${connect?.connection?.name}`)
    }
    catch (e) {
        console.log(e);
        process.exit(1);
    }

}

module.exports = dbConnect;
const mongoose = require("mongoose");

const URI = mongoose.connect("mongodb://127.0.0.1:27017/local");

URI.then(() => {
    console.log("Database connected");
}).catch(() => {
    console.log("Not connected");
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
        unique: true,
    },
    phone_no: {
        type: String,
        required: true,
        unique: true,
    },
    experience: {
        type: Number, // Assuming experience is represented as a number of years
        required: true,
    },
    certificates: {
        type: String,
        required: true,
    },
    certificateFile: {
        type: String, // Assuming the file path or storage reference
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmpassword: {
        type: String,
        required: true,
    }
});

const Trainer_Register = mongoose.model("Trainer_Account", userSchema);

module.exports = Trainer_Register;

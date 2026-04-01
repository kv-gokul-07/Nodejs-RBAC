const USER = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {

    const { username, password, role } = req.body;

    try {
        const hashedPSWD = await bcrypt.hash(password, 10);
        const newUser = new USER({username, password: hashedPSWD, role});
        await newUser.save();
        res.status(201).json({
            message: `User registered successfully with username of ${username}`
        })
    }
    catch (error) {
        // 🎯 Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
            success: false,
            message: "Username already exists",
            field: Object.keys(error.keyValue)[0],
            value: error.keyValue
            });
        }

        // 🎯 Validation error (Mongoose)
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);

            return res.status(400).json({
            success: false,
            message: messages
            });
        }

        // 🎯 Default fallback
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const login = async (req, res) => {

    const { username, password } = req.body;

    try {
        const user = await USER.findOne({username});

        if(!user) {
            res.status(404).json({
                message: `${username} User not found`
            })
        }

        const isMatched = await bcrypt.compare(password, user.password) 

        if(!isMatched) {
            res.status(400).json({
                message: `Invalid Password`
            })
        }

        const token = jwt.sign(
            {
                id: user?._id,
                role: user.role
            }, process.env.JWT_SECRET,
            {expiresIn: "1hr"}
        )

        res.status(200).json({
            token,
            message: `${username} user logged Successfully`
        })

    }
    catch (e) {

        console.log(e, "error")
            res.status(500).json({
                message: `Something went wrong`
            })
        }
}

module.exports = { register, login }
const USER = require("../models/userModel");

const usersLists = async (req, res) => {

    try {
        const user = await USER.find();

        if(!user) {
            res.status(404).json({
                message: `${username} User not found`
            })
        }

        res.status(200).json({
            data: user,
            success: true
        })

    }
    catch (e) {

        console.log(e, "error")
            res.status(500).json({
                message: `Something went wrong`
            })
        }
}

const adminRoute = async (req, res) => {

    try {

        res.status(200).json({
            data: "Welcome to Admin Route",
            success: true
        })

    }
    catch (e) {

        console.log(e, "error")
            res.status(500).json({
                message: `Something went wrong`
            })
        }
}

const managerRoute = async (req, res) => {

    try {

        res.status(200).json({
            data: "Welcome to Manager",
            success: true
        })

    }
    catch (e) {

        console.log(e, "error")
            res.status(500).json({
                message: `Something went wrong`
            })
        }
}

const employeeRoute = async (req, res) => {

    try {

        res.status(200).json({
            data: "Welcome to Employee",
            success: true
        })

    }
    catch (e) {

        console.log(e, "error")
            res.status(500).json({
                message: `Something went wrong`
            })
        }
}

module.exports = {usersLists, adminRoute, managerRoute, employeeRoute}
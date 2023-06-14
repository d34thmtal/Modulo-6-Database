const mongoose = require('mongoose');


const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        lastname: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        birth: {
            type: String,
            require: true
        },
        avatar: {
            type: String,
            require: true
        }
    }
);

const blogSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            require: true
        },
        title: {
            type: String,
            require: true
        },
        cover: {
            type: String,
            require: true
        },
        readTime: {
            value: {
                type: String,
                require: true
            },
            unit: {
                type: Number,
                require: true
            }
        },
        author: {
            name: {
                type: String,
                require: true
            },
            avatar: {
                type: String,
                require: true
            }
        },
    content: {
        type: String,
        require: true
}

    }
);


module.exports = { authorSchema, blogSchema }

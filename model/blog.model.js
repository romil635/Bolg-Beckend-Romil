const mongoose = require('mongoose');

const blogSchema  = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
},{
    versionKey: false,
    timestamps: true,
});


module.exports = mongoose.model("Blog", blogSchema);
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        slug: { type: String, slug: 'fullname', unique: true },
    },
    {
        timestamps: true,
    },
);

mongoose.plugin(slug);
UserSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('User', UserSchema);

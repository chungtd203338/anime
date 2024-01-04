const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const FilmSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, required: true },
        listId: { type: String, required: true },
        genre: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

FilmSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidtype = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidtype ? req.query.type : 'desc',
        });
    }
    return this;
};

mongoose.plugin(slug);
FilmSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Film', FilmSchema);
'use strict';

const slugify = require('slugify');

/**
 * Movie Schema
 */
const { Schema, model } = require('mongoose');

const MovieSchema = new Schema(
    {
        adult: Boolean,
        title: {
            type: String,
            required: [true, 'Movie title is required'],
            minLength: [3, 'Movie title must be at least 3 charracters'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        tagline: {
            type: String,
            required: [true, 'Movie tagline is requred'],
            minLength: [10, 'Movie tagline should be 10 or more characters'],
            trim: true,
            lowercase: true,
        },
        overview: {
            type: String,
            minLength: [20, 'Movie overview should be 20 or more characters'],
        },
        status: {
            type: String,
            enum: {
                values: ['Rumored', 'Planned', 'In Production', 'Released', 'Cancelled'],
                message: '{VALUE} is not supported',
            },
            default: 'Released',
        },
        runtime: Number,
        language: String,
        original_title: String,
        release_date: {
            type: Date,
            default: Date.now,
        },
        ratingQuantity: {
            type: Number,
            default: 0,
        },
        ratingAverage: {
            type: Number,
            default: 4.0,
        },
        backdrop_path: String,
        images: [String],
        slug: String,
    },
    {
        timestamps: true,
    }
);

MovieSchema.pre('save', async function (next) {
    this.slug = slugify(this.title, { lower: true, replacement: '_' });
    next();
});

// Export Movie Model
module.exports = model('Movie', MovieSchema);

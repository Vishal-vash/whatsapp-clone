import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
    name: String,
    code: String,
    capital: String,
    region: String,
    currency: {
        code: String,
        name: String,
        symbol: String
    },
    language: {
        code: String,
        name: String
    },
    flag: String
});

countrySchema.methods.toJSON = function() {
    const country = this;
    const countries = country.toObject();

    delete countries.capital;
    delete countries.code;
    delete countries.currency;
    delete countries.language;
    delete countries.region;

    return countries;
}

const countryModel = mongoose.model('country', countrySchema);

export default countryModel;
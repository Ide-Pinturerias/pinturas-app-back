const { Providers } = require("../../db.js");

const editProvider = async (id, providerData) => {



    const provider = await Providers.findOne({ where: { id } });
    if (!provider) {
        return { message: "provider not found" };
    }
    provider.update(providerData);

    await provider.save();
    return provider;

};

module.exports = editProvider;

const sequelize = require('./db');

module.exports = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
	} catch (e) {
		console.log("Error connect to DB: " + e);
	}
};
const test_sequelize = require('sequelize');

const sequelize = new test_sequelize.Sequelize('sqlite:../database.sqlite');

const User = test_sequelize.define('User', {
    username: test_sequelize.DataTypes.STRING,
    birthday: test_sequelize.DataTypes.DATE
});

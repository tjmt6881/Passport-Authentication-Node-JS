const { Sequelize, DataTypes } = require('sequelize');

var userSchema = {
    name: { 
        type: DataTypes.CHAR(100),
        allowNull: true
    },
    email: { 
        type: DataTypes.CHAR(150),
        allowNull: true
    },
    password: { 
        type: DataTypes.CHAR(200),
        allowNull: true
    },
    date: { 
        type: DataTypes.DATE(),
        allowNull: true,
        defaultValue: new Date()
    },
}

const sequelize = new Sequelize('passportAuth', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});
const User = sequelize.define('User', userSchema);
console.log(User === sequelize.models.User);

module.exports = User;
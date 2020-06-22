module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define(
        'User',
        {
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
                allowNull: true
            },
        }
    )
    return User;
};
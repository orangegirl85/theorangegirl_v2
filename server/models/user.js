let bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            displayName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            role: {
                type: DataTypes.ENUM('ADMIN', 'USER1', 'USER2', 'GUEST'),
                defaultValue: 'GUEST',
            }
        },
        {
            instanceMethods: {
                comparePasswords(password, callback) {
                    bcrypt.compare(password, this.password, callback);
                }

            },
            hooks: {
                beforeCreate(user, options, next) {

                    if (!user.changed('password')) return next(null, options);

                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) return next(err);

                        bcrypt.hash(user.password, salt, null, (err, hash) => {
                            if (err) return next(err);

                            user.password = hash;
                            return next(null, options);
                        })
                    })
                }
            }
        }
    );
    return User;
};

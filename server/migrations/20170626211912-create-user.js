module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            displayName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            role: {
                type: Sequelize.ENUM('ADMIN', 'USER1', 'USER2', 'GUEST'),
                defaultValue: 'GUEST',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        })
    },
    down: function(queryInterface /* , Sequelize */) {
        queryInterface.dropTable('Users');
    }

};

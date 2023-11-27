const Sequelize = require('sequelize');
//autenticação do BD MySQL 'teste'
    const sequelize = new Sequelize('postapp','root','68l#3$UyVi',
        {host:"localhost",
        dialect:"mysql"
    });

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

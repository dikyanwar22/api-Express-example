module.exports = (sequelize, DataTypes) => {
    const variable = sequelize.define('M_users', {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
      },
      no_hp: {
        type: DataTypes.STRING,
        allowNull: false
      }

    }, {
        tableName: 'users' //nama tabel pada database
    });

    return variable;
}

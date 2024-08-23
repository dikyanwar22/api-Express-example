module.exports = (sequelize, DataTypes) => {
    const variable = sequelize.define('M_buah', {

      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false
      },
      harga: {
        type: DataTypes.STRING,
        allowNull: false
      }

    }, {
        tableName: 'buah' //nama tabel pada database
    });

    return variable;
}

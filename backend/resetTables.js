const db = require('./db/models');

const resetTables = async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log('All tables have been reset.');
    process.exit();
  } catch (err) {
    console.error('Error resetting tables:', err);
  }
};

resetTables();

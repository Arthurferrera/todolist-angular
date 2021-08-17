const app = require('./app');

// DEFININDO A PORTA QUE SERÁ USADA
app.listen(3333, async () => {
  const database = require('./config/db');

  try {
    const resultado = await database.sync();
    console.log('database connected');
  } catch (error) {
    console.log(`Error: database not connected, message error - ${error}`);
  }
});
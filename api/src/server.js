const app = require('./app');
const database = require('./config/db');

// DEFININDO A PORTA QUE SERÁ USADA
app.listen(3333, async () => {
  try {
    const resultado = await database.sync();
    console.log('database connected');
  } catch (error) {
    console.log(`Error: database not connected, message error - ${error}`);
  }
});
const { Client } = require('pg');

(async () => {
  const client = new Client({
    connectionString: 'postgres://postgres:Fran24@localhost:5432/fisio-app',
  });
  try {
    await client.connect();
    console.log("Direct connection successful!");
  } catch (err) {
    console.error("Direct connection error:", err);
  } finally {
    await client.end();
  }
})();

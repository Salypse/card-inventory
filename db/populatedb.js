const { Client } = require("pg");
require("dotenv").config();

const SQL = `
    DROP TABLE IF EXISTS inventory;

    CREATE TABLE inventory (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
        name TEXT NOT NULL, 
        game TEXT NOT NULL, 
        image TEXT, 
        condition TEXT NOT NULL,
        is_foil boolean NOT NULL DEFAULT false, 
        quantity INTEGER DEFAULT 1
    );

    INSERT INTO inventory (name, game, image, condition, is_foil, quantity)
    VALUES
        (
            'Oswald, The Lucky Rabbit', 
            'Lorcana',
            '/images/test-card.png',
            'Mint',
            true,
            1
        );
    
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("End.");
}

main();

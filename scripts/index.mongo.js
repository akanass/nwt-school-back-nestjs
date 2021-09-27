/**
 * This script is to create index inside the collection people of the database nwt
 * You can use it with mongo-shell or a tool like Robo3T
 */
db.getCollection('people').createIndex(
  { firstname: 1, lastname: 1 },
  { unique: true },
);

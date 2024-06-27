db = db.getSiblingDB('myNewDB'); // Switch to myNewDB database

db.createUser({
  user: "dbUser",
  pwd: "dbPassword",
  roles: [
    { role: "readWrite", db: "myNewDB" },
    { role: "dbAdmin", db: "myNewDB" }
  ],
  mechanisms: ["SCRAM-SHA-1 "] // Ensure SCRAM-SHA-256 is used
});

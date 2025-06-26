db.createUser(
    {
        user: "backend",
        pwd: "admin123",
        roles: [
            {
                role: "readWrite",
                db: "crud-db"
            }
        ]
    }
);
db.createCollection("users");

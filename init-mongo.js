db.createUser(
    {
        user: "backend",
        pwd: "admin123",
        roles: [
            {
                role: "readWrite",
                db: "artboard"
            }
        ]
    }
);
db.createCollection("users");

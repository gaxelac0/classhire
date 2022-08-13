db.createUser(
        {
            user: "service",
            pwd: "secret",
            roles: [
                {
                    role: "readWrite",
                    db: "classhire"
                }/*, 
                {
                    role: "root",
                    db: "classhire"
                }*/
            ]
        }
);

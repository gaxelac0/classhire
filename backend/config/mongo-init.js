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

db = new Mongo().getDB("classhire");

db.createCollection('profiles', { capped: false });
db.createCollection('users', { capped: false });
db.createCollection('clases', { capped: false });


db.clases.insertMany([
	{
	    "_id": ObjectId("clase0000001"),
	    "price": 5,
	    "title": "Java",
	    "description": "blabla",
	    "tags" : ["matematica", "individual"],
	    "frecuencia": [
		{
		    "value":"diaria"
		}
	    ]
	},
	{
	    "_id": ObjectId("clase0000002"),
	    "price": 5,
	    "title": "analisis matematico",
	    "description": "blabla",
	    "tags" : ["matematica", "individual"],
	    "frecuencia": [
		{
		    "value":"diaria"
		}
	    ]
	},
	{
	    "_id": ObjectId("clase0000003"),
	    "price": 5,
	    "title": "analisis matematico",
	    "description": "blabla",
	    "tags" : ["matematica", "individual"],
	    "frecuencia": [
		{
		    "value":"diaria"
		}
	    ]
	},
	{
	    "_id": ObjectId("clase0000004"),
	    "price": 5,
	    "title": "analisis matematico",
	    "description": "blabla",
	    "tags" : ["matematica", "individual"],
	    "frecuencia": [
		{
		    "value":"diaria"
		}
	    ]
	},
	{
	    "_id": ObjectId("clase0000005"),
	    "price": 5,
	    "title": "analisis matematico",
	    "description": "blabla",
	    "tags" : ["matematica", "individual"],
	    "frecuencia": [
		{
		    "value":"diaria"
		}
	    ]
	},
	{
	    "_id": ObjectId("clase0000006"),
	    "price": 5,
	    "title": "analisis matematico",
	    "description": "blabla",
	    "tags" : ["matematica", "individual"],
	    "frecuencia": [
		{
		    "value":"diaria"
		}
	    ]
	}
]);


db.profiles.insertOne({
	_id: ObjectId("demoteacher0"),
	firstName: "Joe",
	lastName: "Fateree",
	photo: "",
	clases: [ObjectId("clase0000001"), ObjectId("clase0000002"), ObjectId("clase0000003"), ObjectId("clase0000004"), ObjectId("clase0000005"), ObjectId("clase0000006")],
	role: "teacher"
});

db.users.insertOne({
	_id: ObjectId("demoteacher0"),
	profile: ObjectId("demoteacher0"),
	firstName: "Joe",
	lastName: "Fateree",
	email: "teacher@outlook.com",
	password: "$2b$06$T8qZKC8v28SC2SfcVRWLgOgaEwwDy.DXlI2BbnOjpLTm9ApOE67Ru"
});

load('/docker-entrypoint-initdb.d/usersDataToBePersisted.js');
load('/docker-entrypoint-initdb.d/rolesDataToBePersisted.js');

var apiDatabases = [
    {
        dbName: 'gql-hospital',
        dbUsers: [
            {
                username: 'gql',
                password: 'gql',
                roles: ['readWrite', 'dbAdmin']
            }
        ],
        dbData: [
            {
                collection: 'users',
                data: usersDataToBePersisted
            },
            {
                collection: 'roles',
                data: rolesDataToBePersisted
            }
        ]
    },
    {
        dbName: 'gql-hospital-test',
        dbUsers: [
            {
                username: 'gql',
                password: 'gql',
                roles: ['readWrite', 'dbAdmin']
            }
        ],
        dbData: []
    },
];

var collections = {
    'users': (db, userData) => db.users.insert(userData),
    'roles': (db, roleData) => db.roles.insert(roleData)
};

try {
    var db;

    apiDatabases.map((database) => {
        db = db.getSiblingDB(database.dbName);

        print(`[TRACE] - Switching to '${database.dbName}' database ...`);

        database.dbUsers.map((dbUserData) => {
            var roles = dbUserData.roles.reduce((previousValue, role) => {
                var roleDefinition = {};
                roleDefinition.role = role;
                roleDefinition.db = database.dbName;

                previousValue.push(roleDefinition);

                return previousValue;
            }, []);
            
            print(`[TRACE] - Creating the user '${dbUserData.username}' into the '${database.dbName}' database ...`);

            db.createUser({
                user: dbUserData.username, 
                pwd: dbUserData.password, 
                roles: roles
            });

            print(`[ INFO] - The user '${dbUserData.username}' has been created successfully.`);

        });

        if (null != database.dbData && database.dbData.length > 0) {
            database.dbData.map((setOfData) => {
                print(`[ INFO] - Persisting data of collection '${setOfData.collection}'.`);
                setOfData.data.map((document) => {
                    collections[setOfData.collection](db, document);
                });
            });
        }
    });
} catch (error) {
    print(`[ERROR] - ${error.message}`);
}
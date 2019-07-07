In order to create the container, it's needed to run the next command into the `docker` folder.

```sh
$ docker-compose up
```

After creating the MongoDB container, it must needed to update the permissions to the next folders:

```sh
$ sudo chmod 777 docker/data/db/diagnostic.data
$ sudo chmod 777 docker/data/db/journal
```

The application works find with 760 permissions. However, in order to run tests correctly, folders must have the 777 ones.
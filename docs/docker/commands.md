# Docker commands

## Containers

```sh
docker container ls [options]
```

Lista todos los contenedores activos.

**Options**
- `--all`: Muestra todos los contenedores, activos o no.

```sh
docker container start container [container...]
```

Arranca uno o varios contenedores parados.

```sh
docker container rename container new_name
```

Renombra un contenedor específico.

```sh
docker container rm [options] container [container...]
```

Elimina uno o más contenedores.

**Options**
- `-f`: Fuerza la eliminación de un contenedor cuando está en funcionamiento.
- `-v`: Elimina los volúmenes asociados a/los contenedor/es que se elimina/n.

```sh
docker container prune
```

Elimina todos los contenedores parados.


## Volumes

```sh
docker volume create volume
```

Crea el volumen.

```sh
docker volume ls
```

Lista los volúmenes presentes en el sistema.

```sh
docker volume inspect volume [volume...]
```

Muestra información detallada del volumen o volúmenes, en formato JSON.

```sh
docker volume rm [-f] volume [volume...]
```

Elimina uno o más volúmenes

```sh
docker volume prune [options]
```

Elimina uno o más volúmenes que no estén siendo usados

**Options**
- --filter filter: Permite utilizar parámetros de filtrado (por ejemplo 'label=<label>')
- -f: **No pide confirmación** para realizar el borrado.
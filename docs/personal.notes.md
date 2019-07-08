# Usando graphql-import

## Usando Mongoose

- Hay un problema al recuperar un dato desde MongoDB

    Por ejemplo, si estamos obteniendo un User, mogoose devuelve un tipo de dato Document. Esto requiere que en la definición de la entidad User, se importe mongoose y que la clase que define la entidad User extienda mongoose.Document.

    Obviamente esto hace que haya un acoplamiento muy alto entre las entidades y el ORM, en este caso mongoose.
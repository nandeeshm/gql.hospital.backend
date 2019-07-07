import {
    Field,
    ObjectType,
    Int,
    ID,
    createUnionType
} from 'type-graphql';
import { ApiError } from '@apiErrors';

@ObjectType()
class User {
    @Field(type => ID)
    id: string;
    
    @Field()
    name: string;
    
    @Field()
    surname: string;
    
    @Field()
    username: string;
    
    private _password: string;
    
    @Field(type => Int)
    role: number;
    
    @Field()
    token: string;
    
    @Field()
    lastLoginAt: Date;
    
    @Field()
    createdAt: Date;
    
    @Field()
    updatedAt: Date;

    @Field()
    enabled: boolean = true;

    get password(): string {
        return this._password;
    }

    set password(password: string) {
        this._password = password;
    }
}

const UserSearchUnion = createUnionType({
    name: "UserSearchUnion",
    types: [User, ApiError]
});

export {
    User,
    UserSearchUnion
};
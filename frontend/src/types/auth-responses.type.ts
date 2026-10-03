// Mirror de src/users/enums/role.enum.ts
export type RoleT = "USER" | "ADMIN";

// Mirror de la entidad User (src/users/entities/user.entity.ts) después del
// ClassSerializerInterceptor, que te excluye password y hashedRefreshToken
export type UserT = {
    id: string;
    email: string;
    name: string;
    role: RoleT;
    createdAt: string; // Date -> JSON.stringify la manda como string ISO
    updatedAt: string;
};

// Mirror de tokensT (src/common/types/jwt.types.ts)
export type TokensT = {
    access_token: string;
    refresh_token: string;
};

// Lo que authService.register() y authService.login() devuelven tal cual
// ({ user: new User(user), ...tokens })
export type AuthResponseT = {
    user: UserT;
} & TokensT;

// Lo que authService.refresh() devuelve tal cual (solo generateTokens(), sin user)
export type RefreshResponseT = TokensT;

// Bodies que recibe el back — mirror de LoginDto y CreateUserDto
export type LoginCredentialsT = {
    email: string;
    password: string;
};

export type RegisterCredentialsT = LoginCredentialsT & {
    name: string;
};

// Mirror de errorResponseI (all-expetions.filter.ts) — lo que tira CUALQUIER error
export type ErrorResponseT = {
    statusCode: number;
    path: string;
    timestamp: string;
    message: {
        statusCode: number;
        message: string | string[];
        error: string;
    };
};


export type SessionResponseT = Omit<AuthResponseT, "refresh_token">;

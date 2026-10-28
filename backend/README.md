# Proceso para implementar Autentificación y Autorización de Usuarios con roles de clientes o de admin

## Paso 1 — Scaffolding del módulo de usuarios

> Commit: `feat: implement user management module with DTOs, entity, controller, and service`

Primer paso hacia la autenticación/autorización: se creó el módulo `users` completo (entidad, DTOs, enum de roles, controller y service), siguiendo el mismo patrón de `schemas/*.schema.ts` que ya usan `products`, `categories`, `cupons` y `transactions`.

### Archivos creados

```
backend/src/users/
├── dto/
│   ├── create-user.dto.ts
│   └── update-user.dto.ts
├── entities/
│   └── user.entity.ts
├── enums/
│   └── role.enum.ts
├── schemas/
│   └── user.schema.ts
├── types/
│   └── user.types.ts
├── users.controller.ts
├── users.module.ts
└── users.service.ts

backend/src/common/regex/
└── some-regex.ts
```

Y se registró `UsersModule` en `app.module.ts`.

### 1. Rol del usuario (`enums/role.enum.ts`)

```ts
export enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}
```

### 2. Columnas de la entidad (`schemas/user.schema.ts`)

Cada columna vive como una constante `ColumnOptions` separada, igual que en el resto de los módulos:

- `emailUserSchema` → `varchar`, `unique: true`
- `passwordUserSchema` → `varchar`
- `nameUserSchema` → `varchar`, `length: 60`
- `hashedRefreshTokenUserSchema` → `varchar`, `nullable: true`
- `roleUserSchema` → `enum`, `enum: Role`, `default: Role.USER`

### 3. Entidad (`entities/user.entity.ts`)

```ts
@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id! : string

    @Column( emailUserSchema )
    email! : string

    @Column( passwordUserSchema )
    password! : string

    @Column( nameUserSchema )
    name! : string

    @Column( roleUserSchema )
    role! : Role

    @Column( hashedRefreshTokenUserSchema )
    hashedRefreshToken! : string | null

    @CreateDateColumn()
    createdAt! : Date

    @UpdateDateColumn()
    updatedAt! : Date

}
```

`id` es `uuid` (no autoincremental), pensado para no exponer un id secuencial en un recurso de autenticación.

### 4. Validación de entrada (`dto/create-user.dto.ts`)

Con `class-validator`:

- `email` → `@IsEmail()`
- `password` → `@IsString()`, entre 8 y 72 caracteres, `@Matches(passwordRegex)` (mayúscula + minúscula + número) y `@IsStrongPassword()`
- `name` → `@IsString()`, entre 2 y 50 caracteres

El regex de password se extrajo a `common/regex/some-regex.ts` para poder reutilizarlo:

```ts
export const passwordRegex : RegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
```

`update-user.dto.ts` reutiliza el DTO de creación con `PartialType`, como en el resto de los módulos.

### 5. Controller y service

Se generó el CRUD base (`create`, `findAll`, `findOne`, `update`, `remove`) siguiendo la convención de Nest CLI. **Por ahora el service todavía son los stubs por default** (`return 'This action adds a new user'`, etc.) — no hay lógica real ni conexión a la base de datos todavía.

---

## Pendiente para los próximos pasos

- [ ] Registrar el repositorio en `UsersModule` (`TypeOrmModule.forFeature([User])`) — hoy la entidad existe pero no está conectada al módulo.
- [ ] Implementar la lógica real de `UsersService` (hashear `password` con `bcrypt` antes de guardar, chequear `email` duplicado, etc.).
- [ ] Corregir `UsersController`: `findOne`, `update` y `remove` todavía hacen `+id` (lo convierten a `number`), pero el `id` de la entidad es `uuid` (`string`) — hay que sacar esa conversión.
- [ ] Módulo de `Auth`: login, emisión de JWT, y uso de `hashedRefreshToken` (ya está en la entidad, pensado para esto) para el flujo de refresh token.
- [ ] Guard de roles (`RolesGuard` + decorador `@Roles()`) para diferenciar rutas de `ADMIN` (ej. `/admin/products`, `/admin/sales`) de rutas de `USER`.

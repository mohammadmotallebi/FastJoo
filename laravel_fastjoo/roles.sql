create table roles
(
    id         int auto_increment
        primary key,
    role_name  varchar(255) charset utf8mb4 not null,
    role       varchar(255) charset utf8mb4 not null,
    created_at timestamp                    not null,
    updated_at timestamp                    not null
);


create table abilities
(
    id           int auto_increment
        primary key,
    ability_name varchar(255) charset utf8mb4 null,
    ability      varchar(255) charset utf8mb4 null,
    table_name   varchar(255) charset utf8mb4 not null,
    created_at   timestamp                    null,
    updated_at   timestamp                    null
);


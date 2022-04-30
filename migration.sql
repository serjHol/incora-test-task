create table users (
    id bigserial primary key not null,
    first_name varchar(255) not null,
    last_name varchar(255),
    email varchar(255) not null unique,
    phone varchar(255),
    password varchar(255) not null
);
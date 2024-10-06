drop schema if exists tech cascade;

create schema tech;

create table tech.car (
	car_id uuid primary key,
	price numeric,
	status text default 'A',
	brand text not null,
	model text not null,
	color text not null,
	year text not null
);

create table tech.car_history (
	car_history_id uuid primary key,
	car_id text,
	price numeric not null,
	status text not null,
	brand text not null,
	model text not null,
	color text not null,
	year text not null,
    create_at timestamp not null
);


create table tech.order (
	order_id uuid primary key,
	car_id uuid,
	total numeric not null,
	create_at timestamp not null,
	cpf text not null
);
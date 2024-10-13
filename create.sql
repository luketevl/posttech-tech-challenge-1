drop schema if exists postech cascade;

create schema postech;

create table postech.car (
	car_id uuid primary key,
	price numeric,
	status text default 'A',
	brand text not null,
	model text not null,
	color text not null,
	year text not null
);

create table postech.entity_history (
	entity_history_id uuid primary key,
	entity_id uuid,
	data text,
  create_at timestamp not null
);


create table postech.order (
	order_id uuid primary key,
	car_id uuid,
	total numeric not null,
	create_at timestamp not null,
	cpf text not null
);
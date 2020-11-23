create table waiters_info(
    id serial not null primary key,
     waiter_name text not null
);
create table weekdays(
    id serial not null primary key,
     days_booked text
);
create table all_info(
    id serial not null primary key,
     names_id int,
     days_id int,
    foreign key (names_id) references waiters_info(id),
    foreign key (days_id) references weekdays(id)
);


insert into weekdays (days_booked) values ('Sunday');
insert into weekdays (days_booked) values ('Monday');
insert into weekdays (days_booked) values ('Tuesday');
insert into weekdays (days_booked) values ('Wednesday');
insert into weekdays (days_booked) values ('Thursday');
insert into weekdays (days_booked) values ('Friday');
insert into weekdays (days_booked) values ('Saturday');
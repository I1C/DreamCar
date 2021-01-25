CREATE DATABASE dreamcar;

use dreamcar;

create table dreamcar.Bidders(
BidderID int NOT NULL auto_increment primary key,
Name varchar (255),
Email varchar (255),
Price int,
Occupation varchar (255)
);

create table owners (
ID int auto_increment primary key,
Name varchar (255),
Email varchar (255),
Password varchar(255)
);

create table occupations (
ID int auto_increment primary key,
Occupation varchar (255)
);

ALTER TABLE bidders ADD Name varchar(255);
ALTER TABLE bidders ADD Piece int;
ALTER TABLE bidders ADD Email varchar(255);
ALTER TABLE bidders ADD Price int;
ALTER TABLE bidders CHANGE Piece Pieces int;
ALTER TABLE bidders CHANGE OccupationID BidderID varchar(255);

alter table bidders drop column BidderID;
alter table bidders drop column Lname;

insert into occupations (Occupation) value ("tire");
insert into occupations (Occupation) value ("suspensions");
insert into occupations (Occupation) value ("turbocharges");
insert into occupations (Occupation) value ("exhaust pipe");
insert into occupations (Occupation) value ("brake pads");
insert into occupations (Occupation) value ("rearview mirrors");
insert into occupations (Occupation) value ("windshield");

Select * From dreamcar.occupations;

Select * From dreamcar.bidders;

Select * From dreamcar.owners;

ALTER TABLE database1.users ADD LName varchar(255);

SELECT * FROM database1.users;
SELECT * FROM database1.occupation;

DROP TABLE bidders;
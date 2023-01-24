create database nominas;
create table empleados (
    empID int NOT NULL AUTO_INCREMENT,
    nombre varchar(70),
    pLaboral int NOT null
    primary key (empID)
);

create table puesto (
    idPuesto int NOT NULL AUTO_INCREMENT,
    descr varchar(255),
    idTab int NOT NULL,
    primary key (idPuesto)
);

create table tabulador (
    idTab int NOT NULL AUTO_INCREMENT,
    sBase float NOT NULL,
    gratif float NOT NULL,
    desp float NOT NULL,
    isr float NOT NULL,
    sSocial float NOT NULL,
    primary key (idTab)
);

create table usuarios (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255),
    pass varchar(255)
    primary key (id)
);

alter table empleados add foreign key(pLaboral) references puesto(idPuesto);
alter table puesto add foreign key(idTab) references tabulador(idTab);
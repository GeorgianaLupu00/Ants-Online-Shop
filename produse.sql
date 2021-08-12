CREATE DATABASE prajituri1 ENCODING 'UTF-8' LC_COLLATE ' ro-RO-x-icu' LC_CTYPE 'ro_RO' TEMPLATE template0;

CREATE USER 'georgiana' WITH PASSWORD 'georgiana';
GRANT ALL PRIVILEGES ON DATABASE postgres TO georgiana
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO georgiana;
DROP TYPE IF EXISTS categorie;
DROP TYPE IF EXISTS tipuri_produse;

CREATE TYPE categorie AS ENUM( 'furnici', 'accesorii','soluri');


CREATE TABLE IF NOT EXISTS produse (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   culoare VARCHAR(40) NOT NULL,
   curier VARCHAR(50) NOT NULL,
   specie VARCHAR(50) NOT NULL,
   accesorii VARCHAR(50) NOT NULL,
   descriere TEXT,
   caracteristici VARCHAR[],
   pret NUMERIC(8,2) NOT NULL,
   dimensiune NUMERIC(8,2) NOT NULL,
   categorie categ_produse DEFAULT 'furnici',
   livrare_postala BOOLEAN NOT NULL DEFAULT FALSE,
   imagine VARCHAR(300),
   data_Adaugare TIMESTAMP DEFAULT current_timestamp
);

INSERT into produse (caracteristici, categorie, culoare, curier, data_adaugare, descriere, dimensiune, imagine, livrare_postala, nume, pret, specie, accesorii) VALUES 
('{"tesatoare","utile","antiparazite"}',	'furnici',	'maro',	'cargus',	'2021-09-03',	'bebe',	0.30,	1,	'produs1.png',	false,	'Furnici tesatoare',	20.00,'furnicus', 'indisponibile'),

('{"interesante","agile","tesatoare"}', 'furnici',	'rosu',	'cargus',	'2020-09-09',	'adulte',	1.20,	2,	'produs2.png',	false,	'furnici tesatoare de foc',	40.00,	'pamantus',	'acvariu'),

('{"periculoase","otravitoare"}',	'furnici', 'negru',	'fan curier',	'2021-04-04',	'adulte',	2.00,	3,	'produs3.png',	false,	'furnicile maduvei',	70.00,	'invincible',	'acvariu'),

('{"sticla","transparent"}',	'accesorii',	'transparent',	'none',	'2021-10-10',	'autofiltrare',	120.49	,4,	'produs4.jpg',	true,	'acvariu din sticla cu autofiltrare', 3000.00,	'none'	,'lopatica'),

('{"metal","cu model"}',	'accesorii',	'gri',	'cargus',	'2021-03-03',	'model',	15.00, 5,	'produs5.jpg',	false,	'lopatica pamant ',	150.00,	'none',	'capete schimbabile'),

('{"macinat","mediteranean"}',	'soluri',	'maro',	'fan curier',	'2020-05-05',	'ingrasamant',	150.00,	6,	'produs6.jpg', false,	'pamant mediteranean',	200.00,	'furnici de foc',	'indisponibile'),

('{"deratizare","protector"}',	'furnicari',	'negru',	'none',	'2020-05-02',	'rapid'	,50.00,	7,	'produs7.jpg'	,true,	'furnicar negru'	,600.00,	'furnicarul maduvei',	'pastile anti-furnici'),

('{"medicament","otrava"}',	'accesorii',	'albastru',	'cargus',	'2021-09-01',	'sfarmabile',	10.00,	8,	'produs8.jpg',	false	,'pastile antifurnici',	20.00	,'furnici negre',	'indisponibile'),

('{"spray","parfum","otrava"}',	'accesorii',	'negru',	'none',	'2021-03-03',	'parfumat',	30.00,	9,	'produs9.png',	true	,'spray antiparaziti',	50.00	,'furnici tesatoare de foc',	'indisponibile'),

('{"adaptabile","pestritate"}',	'furnici',	'maro',	'cargus',	'2020-02-01',	'bebe',	0.50,	10,	'produs10.png',	false,	'Furnicile Citronella',	30.00	,'furnicus',	'indisponibile'),

('{"daunatoare","agile"}',	'furnici',	'rosu',	'fan curier',	'2021-09-12',	'otravitoare'	,1.25	,11,	'produs11.png',	false,	'Furnici Carpenter',	40.00,	'invincible',	'acvariu'),

('{"utile","antiparazite"}',	'furnici',	'negru',	'none',	'2021-06-06',	'bebe',	0.60,	12,	'produs12.png',	true,	'Furnicile Acrobat',	20.00,	'furnicus'	,'indisponibile'),

('{"regale"}',	'furnici',	'galben',	'cargus',	'2020-09-08',	'adulte',	2.03,	13,	'produs13.png',	false,	'Furnicile Faraonului',	70.00,	'regal',	'acvariu'),

('{"sol","mixt","tratat"}',	'soluri',	'maro',	'none',	'2021-07-04',	'tratat',	15.00,	14,	'produs14.jpeg',	true, 'sol cernoziom',	80.00,	'furnicus',	'lopatica'),

('{"artificial","reciclabil"}',	'accesorii',	'negru'	,'cargus'	,'2021-03-03'	,'artificial',	20.00	,15,	'produs15.jpeg',	false,	'tunel artificial',	750.00,	'furnicus'	,'sol cernoziom');



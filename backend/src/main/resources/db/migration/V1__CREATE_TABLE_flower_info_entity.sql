CREATE TABLE flower_info_entity
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255),
    price       DECIMAL(8, 0) NOT NULL,
    quantity    INT NOT NULL,
    posted_date DATE NOT NULL ,
    picture_url TEXT NOT NULL
);

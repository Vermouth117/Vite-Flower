CREATE TABLE order_info_entity
(
    id            SERIAL PRIMARY KEY,
    flower_id     INT NOT NULL,
    flower_name   VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    price         DECIMAL(8, 0) NOT NULL,
    quantity      INT NOT NULL,
    date          DATE NOT NULL,
    picture_url   TEXT NOT NULL,
    cart          BOOLEAN NOT NULL,
    FOREIGN KEY (flower_id) REFERENCES flower_info_entity (id)
);

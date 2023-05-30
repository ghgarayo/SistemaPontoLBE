CREATE TABLE registro_ponto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    data_completa DATE NOT NULL,
    horario_entrada1 TIME,
    latitude_entrada1 VARCHAR(255),
    longitude_entrada1 VARCHAR(255),
    horario_saida1 TIME,
    latitude_saida1 VARCHAR(255),
    longitude_saida1 VARCHAR(255),
    horario_entrada2 TIME,
    latitude_entrada2 VARCHAR(255),
    longitude_entrada2 VARCHAR(255),
    horario_saida2 TIME,
    latitude_saida2 VARCHAR(255),
    longitude_saida2 VARCHAR(255)
);

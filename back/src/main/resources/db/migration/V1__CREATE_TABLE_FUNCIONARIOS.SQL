CREATE TABLE `funcionarios` (
                                `id` bigint NOT NULL AUTO_INCREMENT,
                                `nome` varchar(255) NOT NULL,
                                `email` varchar(255) NOT NULL,
                                `login` varchar(255) NOT NULL,
                                `senha` varchar(255) NOT NULL,
                                `telefone` varchar(20) NOT NULL,
                                `cpf` varchar(11) NOT NULL,
                                `rg` varchar(20) NOT NULL,
                                `logradouro` varchar(255) NOT NULL,
                                `bairro` varchar(255) NOT NULL,
                                `cep` varchar(8) NOT NULL,
                                `cidade` varchar(255) NOT NULL,
                                `uf` varchar(2) NOT NULL,
                                `numero` varchar(10) DEFAULT NULL,
                                `complemento` varchar(255) DEFAULT NULL,
                                `ativo` tinyint NOT NULL,
                                `is_admin` tinyint NOT NULL,
                                PRIMARY KEY (`id`),
                                UNIQUE KEY `email` (`email`),
                                UNIQUE KEY `login` (`login`)
)




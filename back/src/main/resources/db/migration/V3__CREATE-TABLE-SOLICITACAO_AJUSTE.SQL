CREATE TABLE `solicitacao_ajuste` (
                                      `Id` bigint NOT NULL AUTO_INCREMENT,
                                      `Id_Registro_Ponto` bigint NOT NULL,
                                      `Id_Funcionario` bigint NOT NULL,
                                      `Horario_Entrada1` varchar(20) NOT NULL,
                                      `Horario_Saida1` varchar(20) NOT NULL,
                                      `Horario_Entrada2` varchar(20) NOT NULL,
                                      `Horario_Saida2` varchar(20)  NOT NULL,
                                      `Finalizado_Por` bigint DEFAULT NULL,
                                      `Atualizado_Em_Hora` time DEFAULT NULL,
                                      `Atualizado_Em_Dia` date DEFAULT NULL,
                                      `Descricao` varchar(255) NOT NULL,
                                      `Aprovado` varchar(30) DEFAULT NULL,
                                      `Descricao_Resposta` varchar(255) DEFAULT NULL,
                                      `Ativo` bit(1) NOT NULL,
                                      PRIMARY KEY (`Id`),
                                      KEY `fk_registro_ponto_id_ponto` (`Id_Registro_Ponto`),
                                      CONSTRAINT `fk_registro_ponto_id_ponto` FOREIGN KEY (`Id`) REFERENCES `registro_ponto` (`id`),
                                      KEY `fk_registro_ponto_funcionario_id_ponto` (`Id_Funcionario`),
                                      CONSTRAINT `fk_registro_ponto_funcionario_id_ponto` FOREIGN KEY (`Id_Funcionario`) REFERENCES `funcionarios` (`id`),
                                      KEY `fk_registro_ponto_finalizado_por` (`Finalizado_Por`),
                                      CONSTRAINT `fk_registro_ponto_finalizado_por` FOREIGN KEY (`Id_Funcionario`) REFERENCES `funcionarios` (`id`)

)
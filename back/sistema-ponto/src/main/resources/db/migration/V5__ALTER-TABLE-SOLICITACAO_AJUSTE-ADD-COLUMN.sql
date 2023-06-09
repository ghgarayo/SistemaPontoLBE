ALTER TABLE solicitacao_ajuste
    ADD COLUMN Horario_Entrada1 VARCHAR (20) NOT NULL AFTER Id_Funcionario,
    ADD COLUMN Horario_Saida1 VARCHAR(6) NOT NULL AFTER Horario_Entrada1,
    ADD COLUMN Horario_Entrada2 VARCHAR (20) NOT NULL AFTER  Horario_Saida1,
    ADD COLUMN Horario_Saida2 VARCHAR(6) NOT NULL AFTER Horario_Entrada2,
    ADD COLUMN Ativo BIT NOT NULL;
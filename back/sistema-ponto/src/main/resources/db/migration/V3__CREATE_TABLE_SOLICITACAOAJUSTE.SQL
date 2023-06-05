CREATE TABLE solicitacao_ajuste(
    Id BIGINT AUTO_INCREMENT PRIMARY KEY,
    Id_Registro_Ponto BIGINT NOT NULL,
    Id_Funcionario BIGINT NOT NULL,
    Aprovado_Por BIGINT NOT NULL,
    Atualizado_Em_Hora TIME NOT NULL,
    Atualizado_Em_Dia DATE NOT NULL,
    Descricao VARCHAR(255) NOT NULL,
    Aprovado VARCHAR(30),
    Descricao_Resposta VARCHAR(255)
);
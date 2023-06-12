alter table registro_ponto add
    constraint fk_registro_ponto_funcionario_id foreign key (Id_Funcionario) references funcionarios(id)
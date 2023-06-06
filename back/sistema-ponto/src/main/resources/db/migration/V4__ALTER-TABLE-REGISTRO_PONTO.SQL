alter table registro_ponto add column Id_Funcionario BIGINT NOT NULL;

UPDATE registro_ponto SET Id_Funcionario = 1 WHERE login = 'ghgarayo@gmail.com';

UPDATE registro_ponto SET Id_Funcionario = 2 WHERE login = 'carolinerampim@hotmail.com';

alter table registro_ponto drop column login;

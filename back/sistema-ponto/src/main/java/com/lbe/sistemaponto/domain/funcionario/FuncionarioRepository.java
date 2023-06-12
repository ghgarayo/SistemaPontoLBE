package com.lbe.sistemaponto.domain.funcionario;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;


public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    Page<Funcionario> findAllByAtivoTrue(Pageable paginacao);

    UserDetails findByLogin(String login);

    @Query("""
            select f.ativo
            from Funcionario f
            where f.id = :idFuncionario
            """)
    Boolean findAtivoById(Long idFuncionario);
}

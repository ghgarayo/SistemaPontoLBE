package com.lbe.sistemaponto.infra.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lbe.sistemaponto.domain.funcionario.FuncionarioRepository;

@Service // notação para mostrar para o Spring que isso será carregado como um serviço
public class AutenticacaoService implements UserDetailsService {

    /*
     * UserDetails Service é uma interface do proprio Spring que vai representar um
     * serviço de autenticação.
     * Esta classe é chamada pelo próprio Spring, sem necessidade de injeção em
     * nenhum controller.
     */

    @Autowired
    private FuncionarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        /*
         * Este método é responsavel por fazer a autenticação toda vez que o usuário
         * fizer login.
         * Após acessar o banco de dados, ele retorna um usuário caso encontre-o;
         */

        return repository.findByLogin(username);
    }

}

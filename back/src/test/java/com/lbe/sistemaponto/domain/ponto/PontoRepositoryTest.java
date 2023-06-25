package com.lbe.sistemaponto.domain.ponto;

import com.lbe.sistemaponto.domain.endereco.DadosEndereco;
import com.lbe.sistemaponto.domain.funcionario.DadosCadastroFuncionario;
import com.lbe.sistemaponto.domain.funcionario.Funcionario;
import com.lbe.sistemaponto.domain.funcionario.FuncionarioRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest // Notação para testar uma interface Repository
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
class PontoRepositoryTest {

    @Autowired
    private PontoRepository pontoRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private TestEntityManager em;

    @Test
    void findByIdFuncionario() {
    }

    @Test
    void findByIdFuncionarioAndDataCompleta() {
    }






    private void registrarPonto(DadosBatidaPonto dados) {
        em.persist(new Ponto(dados));
    }

    private Funcionario cadastrarFuncionario(String nome, String email, String telefone, String cpf, String rg, Boolean isAdmin) {
        var  funcionario = new Funcionario(dadosFuncionario(nome, email, telefone, cpf, rg, isAdmin));
        em.persist(funcionario);
        return funcionario;
    }

    private DadosBatidaPonto dadosBatidaPonto(Long idFuncionario, LocalDate dataCompleta, LocalTime horarioCompleto, String longitude, String latitude){
        return new DadosBatidaPonto(
                idFuncionario, dataCompleta, horarioCompleto, longitude, latitude
        );
    }
    private DadosCadastroFuncionario dadosFuncionario(String nome, String email, String telefone, String cpf, String rg, Boolean isAdmin) {
        return new DadosCadastroFuncionario(
                nome,
                email,
                "102030",
                telefone,
                cpf,
                rg,
                dadosEndereco(),
                isAdmin
        );
    }

    private DadosEndereco dadosEndereco() {
        return new DadosEndereco(
                "rua xpto",
                "bairro",
                "00000000",
                "Brasilia",
                "DF",
                null,
                null
        );
    }


}
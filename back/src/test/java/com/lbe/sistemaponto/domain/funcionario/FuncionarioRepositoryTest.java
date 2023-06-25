package com.lbe.sistemaponto.domain.funcionario;

import com.lbe.sistemaponto.domain.endereco.DadosEndereco;
import com.lbe.sistemaponto.domain.ponto.DadosBatidaPonto;
import com.lbe.sistemaponto.domain.ponto.Ponto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest // Notação para testar uma interface Repository
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
class FuncionarioRepositoryTest {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private TestEntityManager em;

    @Test
    @DisplayName("Procura se no banco de dados o funcionario esta cadastrado.")
    void findAtivoByIdCenario1(){
        // given ou arrange
        var funcionario = cadastrarFuncionario("Joao Paulo","joaopaulo@gmail.com","41999291301","00100200304","12345678",false);
        // when ou act
        var funcionarioValido = funcionarioRepository.findByLogin("joaopaulo@gmail.com");
        //then ou assert
        assertThat(funcionarioValido).isEqualTo(funcionario);
    }
    @Test
    @DisplayName("Procura se no banco de dados o funcionario esta ativo.")
    void findAtivoByIdCenario2(){
        // given ou arrange
        var funcionario = cadastrarFuncionario("Joao Paulo","joaopaulo@gmail.com","41999291301","00100200304","12345678",false);
        // when ou act
        var funcionarioValido = funcionarioRepository.findAtivoById(45L);
        //then ou assert
        assertThat(funcionarioValido).isNull();
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
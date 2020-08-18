package dw.dw.dw.web.rest;

import dw.dw.dw.Demografia2App;
import dw.dw.dw.domain.Profissao;
import dw.dw.dw.repository.ProfissaoRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProfissaoResource} REST controller.
 */
@SpringBootTest(classes = Demografia2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProfissaoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private ProfissaoRepository profissaoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfissaoMockMvc;

    private Profissao profissao;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Profissao createEntity(EntityManager em) {
        Profissao profissao = new Profissao()
            .nome(DEFAULT_NOME);
        return profissao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Profissao createUpdatedEntity(EntityManager em) {
        Profissao profissao = new Profissao()
            .nome(UPDATED_NOME);
        return profissao;
    }

    @BeforeEach
    public void initTest() {
        profissao = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfissao() throws Exception {
        int databaseSizeBeforeCreate = profissaoRepository.findAll().size();
        // Create the Profissao
        restProfissaoMockMvc.perform(post("/api/profissaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profissao)))
            .andExpect(status().isCreated());

        // Validate the Profissao in the database
        List<Profissao> profissaoList = profissaoRepository.findAll();
        assertThat(profissaoList).hasSize(databaseSizeBeforeCreate + 1);
        Profissao testProfissao = profissaoList.get(profissaoList.size() - 1);
        assertThat(testProfissao.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createProfissaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profissaoRepository.findAll().size();

        // Create the Profissao with an existing ID
        profissao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfissaoMockMvc.perform(post("/api/profissaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profissao)))
            .andExpect(status().isBadRequest());

        // Validate the Profissao in the database
        List<Profissao> profissaoList = profissaoRepository.findAll();
        assertThat(profissaoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProfissaos() throws Exception {
        // Initialize the database
        profissaoRepository.saveAndFlush(profissao);

        // Get all the profissaoList
        restProfissaoMockMvc.perform(get("/api/profissaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profissao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getProfissao() throws Exception {
        // Initialize the database
        profissaoRepository.saveAndFlush(profissao);

        // Get the profissao
        restProfissaoMockMvc.perform(get("/api/profissaos/{id}", profissao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(profissao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingProfissao() throws Exception {
        // Get the profissao
        restProfissaoMockMvc.perform(get("/api/profissaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfissao() throws Exception {
        // Initialize the database
        profissaoRepository.saveAndFlush(profissao);

        int databaseSizeBeforeUpdate = profissaoRepository.findAll().size();

        // Update the profissao
        Profissao updatedProfissao = profissaoRepository.findById(profissao.getId()).get();
        // Disconnect from session so that the updates on updatedProfissao are not directly saved in db
        em.detach(updatedProfissao);
        updatedProfissao
            .nome(UPDATED_NOME);

        restProfissaoMockMvc.perform(put("/api/profissaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfissao)))
            .andExpect(status().isOk());

        // Validate the Profissao in the database
        List<Profissao> profissaoList = profissaoRepository.findAll();
        assertThat(profissaoList).hasSize(databaseSizeBeforeUpdate);
        Profissao testProfissao = profissaoList.get(profissaoList.size() - 1);
        assertThat(testProfissao.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingProfissao() throws Exception {
        int databaseSizeBeforeUpdate = profissaoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfissaoMockMvc.perform(put("/api/profissaos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profissao)))
            .andExpect(status().isBadRequest());

        // Validate the Profissao in the database
        List<Profissao> profissaoList = profissaoRepository.findAll();
        assertThat(profissaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfissao() throws Exception {
        // Initialize the database
        profissaoRepository.saveAndFlush(profissao);

        int databaseSizeBeforeDelete = profissaoRepository.findAll().size();

        // Delete the profissao
        restProfissaoMockMvc.perform(delete("/api/profissaos/{id}", profissao.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Profissao> profissaoList = profissaoRepository.findAll();
        assertThat(profissaoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

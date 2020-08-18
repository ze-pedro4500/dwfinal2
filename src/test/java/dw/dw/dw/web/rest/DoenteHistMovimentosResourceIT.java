package dw.dw.dw.web.rest;

import dw.dw.dw.Demografia2App;
import dw.dw.dw.domain.DoenteHistMovimentos;
import dw.dw.dw.repository.DoenteHistMovimentosRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import dw.dw.dw.domain.enumeration.Situacao;
import dw.dw.dw.domain.enumeration.Situacao;
/**
 * Integration tests for the {@link DoenteHistMovimentosResource} REST controller.
 */
@SpringBootTest(classes = Demografia2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class DoenteHistMovimentosResourceIT {

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final Situacao DEFAULT_SITUACAO = Situacao.StatusPRHD;
    private static final Situacao UPDATED_SITUACAO = Situacao.StatusFalecido;

    private static final Situacao DEFAULT_STATUSPREVIO = Situacao.StatusPRHD;
    private static final Situacao UPDATED_STATUSPREVIO = Situacao.StatusFalecido;

    private static final String DEFAULT_CAUSA_MORTE = "AAAAAAAAAA";
    private static final String UPDATED_CAUSA_MORTE = "BBBBBBBBBB";

    private static final String DEFAULT_OBS = "AAAAAAAAAA";
    private static final String UPDATED_OBS = "BBBBBBBBBB";

    @Autowired
    private DoenteHistMovimentosRepository doenteHistMovimentosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDoenteHistMovimentosMockMvc;

    private DoenteHistMovimentos doenteHistMovimentos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DoenteHistMovimentos createEntity(EntityManager em) {
        DoenteHistMovimentos doenteHistMovimentos = new DoenteHistMovimentos()
            .data(DEFAULT_DATA)
            .situacao(DEFAULT_SITUACAO)
            .statusprevio(DEFAULT_STATUSPREVIO)
            .causaMorte(DEFAULT_CAUSA_MORTE)
            .obs(DEFAULT_OBS);
        return doenteHistMovimentos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DoenteHistMovimentos createUpdatedEntity(EntityManager em) {
        DoenteHistMovimentos doenteHistMovimentos = new DoenteHistMovimentos()
            .data(UPDATED_DATA)
            .situacao(UPDATED_SITUACAO)
            .statusprevio(UPDATED_STATUSPREVIO)
            .causaMorte(UPDATED_CAUSA_MORTE)
            .obs(UPDATED_OBS);
        return doenteHistMovimentos;
    }

    @BeforeEach
    public void initTest() {
        doenteHistMovimentos = createEntity(em);
    }

    @Test
    @Transactional
    public void createDoenteHistMovimentos() throws Exception {
        int databaseSizeBeforeCreate = doenteHistMovimentosRepository.findAll().size();
        // Create the DoenteHistMovimentos
        restDoenteHistMovimentosMockMvc.perform(post("/api/doente-hist-movimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doenteHistMovimentos)))
            .andExpect(status().isCreated());

        // Validate the DoenteHistMovimentos in the database
        List<DoenteHistMovimentos> doenteHistMovimentosList = doenteHistMovimentosRepository.findAll();
        assertThat(doenteHistMovimentosList).hasSize(databaseSizeBeforeCreate + 1);
        DoenteHistMovimentos testDoenteHistMovimentos = doenteHistMovimentosList.get(doenteHistMovimentosList.size() - 1);
        assertThat(testDoenteHistMovimentos.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testDoenteHistMovimentos.getSituacao()).isEqualTo(DEFAULT_SITUACAO);
        assertThat(testDoenteHistMovimentos.getStatusprevio()).isEqualTo(DEFAULT_STATUSPREVIO);
        assertThat(testDoenteHistMovimentos.getCausaMorte()).isEqualTo(DEFAULT_CAUSA_MORTE);
        assertThat(testDoenteHistMovimentos.getObs()).isEqualTo(DEFAULT_OBS);
    }

    @Test
    @Transactional
    public void createDoenteHistMovimentosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = doenteHistMovimentosRepository.findAll().size();

        // Create the DoenteHistMovimentos with an existing ID
        doenteHistMovimentos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDoenteHistMovimentosMockMvc.perform(post("/api/doente-hist-movimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doenteHistMovimentos)))
            .andExpect(status().isBadRequest());

        // Validate the DoenteHistMovimentos in the database
        List<DoenteHistMovimentos> doenteHistMovimentosList = doenteHistMovimentosRepository.findAll();
        assertThat(doenteHistMovimentosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDoenteHistMovimentos() throws Exception {
        // Initialize the database
        doenteHistMovimentosRepository.saveAndFlush(doenteHistMovimentos);

        // Get all the doenteHistMovimentosList
        restDoenteHistMovimentosMockMvc.perform(get("/api/doente-hist-movimentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(doenteHistMovimentos.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].situacao").value(hasItem(DEFAULT_SITUACAO.toString())))
            .andExpect(jsonPath("$.[*].statusprevio").value(hasItem(DEFAULT_STATUSPREVIO.toString())))
            .andExpect(jsonPath("$.[*].causaMorte").value(hasItem(DEFAULT_CAUSA_MORTE)))
            .andExpect(jsonPath("$.[*].obs").value(hasItem(DEFAULT_OBS)));
    }
    
    @Test
    @Transactional
    public void getDoenteHistMovimentos() throws Exception {
        // Initialize the database
        doenteHistMovimentosRepository.saveAndFlush(doenteHistMovimentos);

        // Get the doenteHistMovimentos
        restDoenteHistMovimentosMockMvc.perform(get("/api/doente-hist-movimentos/{id}", doenteHistMovimentos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(doenteHistMovimentos.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.situacao").value(DEFAULT_SITUACAO.toString()))
            .andExpect(jsonPath("$.statusprevio").value(DEFAULT_STATUSPREVIO.toString()))
            .andExpect(jsonPath("$.causaMorte").value(DEFAULT_CAUSA_MORTE))
            .andExpect(jsonPath("$.obs").value(DEFAULT_OBS));
    }
    @Test
    @Transactional
    public void getNonExistingDoenteHistMovimentos() throws Exception {
        // Get the doenteHistMovimentos
        restDoenteHistMovimentosMockMvc.perform(get("/api/doente-hist-movimentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDoenteHistMovimentos() throws Exception {
        // Initialize the database
        doenteHistMovimentosRepository.saveAndFlush(doenteHistMovimentos);

        int databaseSizeBeforeUpdate = doenteHistMovimentosRepository.findAll().size();

        // Update the doenteHistMovimentos
        DoenteHistMovimentos updatedDoenteHistMovimentos = doenteHistMovimentosRepository.findById(doenteHistMovimentos.getId()).get();
        // Disconnect from session so that the updates on updatedDoenteHistMovimentos are not directly saved in db
        em.detach(updatedDoenteHistMovimentos);
        updatedDoenteHistMovimentos
            .data(UPDATED_DATA)
            .situacao(UPDATED_SITUACAO)
            .statusprevio(UPDATED_STATUSPREVIO)
            .causaMorte(UPDATED_CAUSA_MORTE)
            .obs(UPDATED_OBS);

        restDoenteHistMovimentosMockMvc.perform(put("/api/doente-hist-movimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDoenteHistMovimentos)))
            .andExpect(status().isOk());

        // Validate the DoenteHistMovimentos in the database
        List<DoenteHistMovimentos> doenteHistMovimentosList = doenteHistMovimentosRepository.findAll();
        assertThat(doenteHistMovimentosList).hasSize(databaseSizeBeforeUpdate);
        DoenteHistMovimentos testDoenteHistMovimentos = doenteHistMovimentosList.get(doenteHistMovimentosList.size() - 1);
        assertThat(testDoenteHistMovimentos.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testDoenteHistMovimentos.getSituacao()).isEqualTo(UPDATED_SITUACAO);
        assertThat(testDoenteHistMovimentos.getStatusprevio()).isEqualTo(UPDATED_STATUSPREVIO);
        assertThat(testDoenteHistMovimentos.getCausaMorte()).isEqualTo(UPDATED_CAUSA_MORTE);
        assertThat(testDoenteHistMovimentos.getObs()).isEqualTo(UPDATED_OBS);
    }

    @Test
    @Transactional
    public void updateNonExistingDoenteHistMovimentos() throws Exception {
        int databaseSizeBeforeUpdate = doenteHistMovimentosRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDoenteHistMovimentosMockMvc.perform(put("/api/doente-hist-movimentos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doenteHistMovimentos)))
            .andExpect(status().isBadRequest());

        // Validate the DoenteHistMovimentos in the database
        List<DoenteHistMovimentos> doenteHistMovimentosList = doenteHistMovimentosRepository.findAll();
        assertThat(doenteHistMovimentosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDoenteHistMovimentos() throws Exception {
        // Initialize the database
        doenteHistMovimentosRepository.saveAndFlush(doenteHistMovimentos);

        int databaseSizeBeforeDelete = doenteHistMovimentosRepository.findAll().size();

        // Delete the doenteHistMovimentos
        restDoenteHistMovimentosMockMvc.perform(delete("/api/doente-hist-movimentos/{id}", doenteHistMovimentos.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DoenteHistMovimentos> doenteHistMovimentosList = doenteHistMovimentosRepository.findAll();
        assertThat(doenteHistMovimentosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

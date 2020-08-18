package dw.dw.dw.web.rest;

import dw.dw.dw.Demografia2App;
import dw.dw.dw.domain.Doente;
import dw.dw.dw.repository.DoenteRepository;

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

import dw.dw.dw.domain.enumeration.Situacao;
/**
 * Integration tests for the {@link DoenteResource} REST controller.
 */
@SpringBootTest(classes = Demografia2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class DoenteResourceIT {

    private static final Situacao DEFAULT_SITUACAO = Situacao.StatusPRHD;
    private static final Situacao UPDATED_SITUACAO = Situacao.StatusFalecido;

    @Autowired
    private DoenteRepository doenteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDoenteMockMvc;

    private Doente doente;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Doente createEntity(EntityManager em) {
        Doente doente = new Doente()
            .situacao(DEFAULT_SITUACAO);
        return doente;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Doente createUpdatedEntity(EntityManager em) {
        Doente doente = new Doente()
            .situacao(UPDATED_SITUACAO);
        return doente;
    }

    @BeforeEach
    public void initTest() {
        doente = createEntity(em);
    }

    @Test
    @Transactional
    public void createDoente() throws Exception {
        int databaseSizeBeforeCreate = doenteRepository.findAll().size();
        // Create the Doente
        restDoenteMockMvc.perform(post("/api/doentes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doente)))
            .andExpect(status().isCreated());

        // Validate the Doente in the database
        List<Doente> doenteList = doenteRepository.findAll();
        assertThat(doenteList).hasSize(databaseSizeBeforeCreate + 1);
        Doente testDoente = doenteList.get(doenteList.size() - 1);
        assertThat(testDoente.getSituacao()).isEqualTo(DEFAULT_SITUACAO);
    }

    @Test
    @Transactional
    public void createDoenteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = doenteRepository.findAll().size();

        // Create the Doente with an existing ID
        doente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDoenteMockMvc.perform(post("/api/doentes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doente)))
            .andExpect(status().isBadRequest());

        // Validate the Doente in the database
        List<Doente> doenteList = doenteRepository.findAll();
        assertThat(doenteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDoentes() throws Exception {
        // Initialize the database
        doenteRepository.saveAndFlush(doente);

        // Get all the doenteList
        restDoenteMockMvc.perform(get("/api/doentes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(doente.getId().intValue())))
            .andExpect(jsonPath("$.[*].situacao").value(hasItem(DEFAULT_SITUACAO.toString())));
    }
    
    @Test
    @Transactional
    public void getDoente() throws Exception {
        // Initialize the database
        doenteRepository.saveAndFlush(doente);

        // Get the doente
        restDoenteMockMvc.perform(get("/api/doentes/{id}", doente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(doente.getId().intValue()))
            .andExpect(jsonPath("$.situacao").value(DEFAULT_SITUACAO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDoente() throws Exception {
        // Get the doente
        restDoenteMockMvc.perform(get("/api/doentes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDoente() throws Exception {
        // Initialize the database
        doenteRepository.saveAndFlush(doente);

        int databaseSizeBeforeUpdate = doenteRepository.findAll().size();

        // Update the doente
        Doente updatedDoente = doenteRepository.findById(doente.getId()).get();
        // Disconnect from session so that the updates on updatedDoente are not directly saved in db
        em.detach(updatedDoente);
        updatedDoente
            .situacao(UPDATED_SITUACAO);

        restDoenteMockMvc.perform(put("/api/doentes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDoente)))
            .andExpect(status().isOk());

        // Validate the Doente in the database
        List<Doente> doenteList = doenteRepository.findAll();
        assertThat(doenteList).hasSize(databaseSizeBeforeUpdate);
        Doente testDoente = doenteList.get(doenteList.size() - 1);
        assertThat(testDoente.getSituacao()).isEqualTo(UPDATED_SITUACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingDoente() throws Exception {
        int databaseSizeBeforeUpdate = doenteRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDoenteMockMvc.perform(put("/api/doentes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doente)))
            .andExpect(status().isBadRequest());

        // Validate the Doente in the database
        List<Doente> doenteList = doenteRepository.findAll();
        assertThat(doenteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDoente() throws Exception {
        // Initialize the database
        doenteRepository.saveAndFlush(doente);

        int databaseSizeBeforeDelete = doenteRepository.findAll().size();

        // Delete the doente
        restDoenteMockMvc.perform(delete("/api/doentes/{id}", doente.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Doente> doenteList = doenteRepository.findAll();
        assertThat(doenteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

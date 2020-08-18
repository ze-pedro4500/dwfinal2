package dw.dw.dw.web.rest;

import dw.dw.dw.Demografia2App;
import dw.dw.dw.domain.DoenteRegistosIntervencoes;
import dw.dw.dw.repository.DoenteRegistosIntervencoesRepository;

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
 * Integration tests for the {@link DoenteRegistosIntervencoesResource} REST controller.
 */
@SpringBootTest(classes = Demografia2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class DoenteRegistosIntervencoesResourceIT {

    private static final String DEFAULT_DESCR = "AAAAAAAAAA";
    private static final String UPDATED_DESCR = "BBBBBBBBBB";

    @Autowired
    private DoenteRegistosIntervencoesRepository doenteRegistosIntervencoesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDoenteRegistosIntervencoesMockMvc;

    private DoenteRegistosIntervencoes doenteRegistosIntervencoes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DoenteRegistosIntervencoes createEntity(EntityManager em) {
        DoenteRegistosIntervencoes doenteRegistosIntervencoes = new DoenteRegistosIntervencoes()
            .descr(DEFAULT_DESCR);
        return doenteRegistosIntervencoes;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DoenteRegistosIntervencoes createUpdatedEntity(EntityManager em) {
        DoenteRegistosIntervencoes doenteRegistosIntervencoes = new DoenteRegistosIntervencoes()
            .descr(UPDATED_DESCR);
        return doenteRegistosIntervencoes;
    }

    @BeforeEach
    public void initTest() {
        doenteRegistosIntervencoes = createEntity(em);
    }

    @Test
    @Transactional
    public void createDoenteRegistosIntervencoes() throws Exception {
        int databaseSizeBeforeCreate = doenteRegistosIntervencoesRepository.findAll().size();
        // Create the DoenteRegistosIntervencoes
        restDoenteRegistosIntervencoesMockMvc.perform(post("/api/doente-registos-intervencoes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doenteRegistosIntervencoes)))
            .andExpect(status().isCreated());

        // Validate the DoenteRegistosIntervencoes in the database
        List<DoenteRegistosIntervencoes> doenteRegistosIntervencoesList = doenteRegistosIntervencoesRepository.findAll();
        assertThat(doenteRegistosIntervencoesList).hasSize(databaseSizeBeforeCreate + 1);
        DoenteRegistosIntervencoes testDoenteRegistosIntervencoes = doenteRegistosIntervencoesList.get(doenteRegistosIntervencoesList.size() - 1);
        assertThat(testDoenteRegistosIntervencoes.getDescr()).isEqualTo(DEFAULT_DESCR);
    }

    @Test
    @Transactional
    public void createDoenteRegistosIntervencoesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = doenteRegistosIntervencoesRepository.findAll().size();

        // Create the DoenteRegistosIntervencoes with an existing ID
        doenteRegistosIntervencoes.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDoenteRegistosIntervencoesMockMvc.perform(post("/api/doente-registos-intervencoes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doenteRegistosIntervencoes)))
            .andExpect(status().isBadRequest());

        // Validate the DoenteRegistosIntervencoes in the database
        List<DoenteRegistosIntervencoes> doenteRegistosIntervencoesList = doenteRegistosIntervencoesRepository.findAll();
        assertThat(doenteRegistosIntervencoesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDoenteRegistosIntervencoes() throws Exception {
        // Initialize the database
        doenteRegistosIntervencoesRepository.saveAndFlush(doenteRegistosIntervencoes);

        // Get all the doenteRegistosIntervencoesList
        restDoenteRegistosIntervencoesMockMvc.perform(get("/api/doente-registos-intervencoes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(doenteRegistosIntervencoes.getId().intValue())))
            .andExpect(jsonPath("$.[*].descr").value(hasItem(DEFAULT_DESCR)));
    }
    
    @Test
    @Transactional
    public void getDoenteRegistosIntervencoes() throws Exception {
        // Initialize the database
        doenteRegistosIntervencoesRepository.saveAndFlush(doenteRegistosIntervencoes);

        // Get the doenteRegistosIntervencoes
        restDoenteRegistosIntervencoesMockMvc.perform(get("/api/doente-registos-intervencoes/{id}", doenteRegistosIntervencoes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(doenteRegistosIntervencoes.getId().intValue()))
            .andExpect(jsonPath("$.descr").value(DEFAULT_DESCR));
    }
    @Test
    @Transactional
    public void getNonExistingDoenteRegistosIntervencoes() throws Exception {
        // Get the doenteRegistosIntervencoes
        restDoenteRegistosIntervencoesMockMvc.perform(get("/api/doente-registos-intervencoes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDoenteRegistosIntervencoes() throws Exception {
        // Initialize the database
        doenteRegistosIntervencoesRepository.saveAndFlush(doenteRegistosIntervencoes);

        int databaseSizeBeforeUpdate = doenteRegistosIntervencoesRepository.findAll().size();

        // Update the doenteRegistosIntervencoes
        DoenteRegistosIntervencoes updatedDoenteRegistosIntervencoes = doenteRegistosIntervencoesRepository.findById(doenteRegistosIntervencoes.getId()).get();
        // Disconnect from session so that the updates on updatedDoenteRegistosIntervencoes are not directly saved in db
        em.detach(updatedDoenteRegistosIntervencoes);
        updatedDoenteRegistosIntervencoes
            .descr(UPDATED_DESCR);

        restDoenteRegistosIntervencoesMockMvc.perform(put("/api/doente-registos-intervencoes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDoenteRegistosIntervencoes)))
            .andExpect(status().isOk());

        // Validate the DoenteRegistosIntervencoes in the database
        List<DoenteRegistosIntervencoes> doenteRegistosIntervencoesList = doenteRegistosIntervencoesRepository.findAll();
        assertThat(doenteRegistosIntervencoesList).hasSize(databaseSizeBeforeUpdate);
        DoenteRegistosIntervencoes testDoenteRegistosIntervencoes = doenteRegistosIntervencoesList.get(doenteRegistosIntervencoesList.size() - 1);
        assertThat(testDoenteRegistosIntervencoes.getDescr()).isEqualTo(UPDATED_DESCR);
    }

    @Test
    @Transactional
    public void updateNonExistingDoenteRegistosIntervencoes() throws Exception {
        int databaseSizeBeforeUpdate = doenteRegistosIntervencoesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDoenteRegistosIntervencoesMockMvc.perform(put("/api/doente-registos-intervencoes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doenteRegistosIntervencoes)))
            .andExpect(status().isBadRequest());

        // Validate the DoenteRegistosIntervencoes in the database
        List<DoenteRegistosIntervencoes> doenteRegistosIntervencoesList = doenteRegistosIntervencoesRepository.findAll();
        assertThat(doenteRegistosIntervencoesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDoenteRegistosIntervencoes() throws Exception {
        // Initialize the database
        doenteRegistosIntervencoesRepository.saveAndFlush(doenteRegistosIntervencoes);

        int databaseSizeBeforeDelete = doenteRegistosIntervencoesRepository.findAll().size();

        // Delete the doenteRegistosIntervencoes
        restDoenteRegistosIntervencoesMockMvc.perform(delete("/api/doente-registos-intervencoes/{id}", doenteRegistosIntervencoes.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DoenteRegistosIntervencoes> doenteRegistosIntervencoesList = doenteRegistosIntervencoesRepository.findAll();
        assertThat(doenteRegistosIntervencoesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

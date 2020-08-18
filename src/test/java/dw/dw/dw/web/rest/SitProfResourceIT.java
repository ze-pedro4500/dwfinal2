package dw.dw.dw.web.rest;

import dw.dw.dw.Demografia2App;
import dw.dw.dw.domain.SitProf;
import dw.dw.dw.repository.SitProfRepository;

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
 * Integration tests for the {@link SitProfResource} REST controller.
 */
@SpringBootTest(classes = Demografia2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class SitProfResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private SitProfRepository sitProfRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSitProfMockMvc;

    private SitProf sitProf;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SitProf createEntity(EntityManager em) {
        SitProf sitProf = new SitProf()
            .nome(DEFAULT_NOME);
        return sitProf;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SitProf createUpdatedEntity(EntityManager em) {
        SitProf sitProf = new SitProf()
            .nome(UPDATED_NOME);
        return sitProf;
    }

    @BeforeEach
    public void initTest() {
        sitProf = createEntity(em);
    }

    @Test
    @Transactional
    public void createSitProf() throws Exception {
        int databaseSizeBeforeCreate = sitProfRepository.findAll().size();
        // Create the SitProf
        restSitProfMockMvc.perform(post("/api/sit-profs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sitProf)))
            .andExpect(status().isCreated());

        // Validate the SitProf in the database
        List<SitProf> sitProfList = sitProfRepository.findAll();
        assertThat(sitProfList).hasSize(databaseSizeBeforeCreate + 1);
        SitProf testSitProf = sitProfList.get(sitProfList.size() - 1);
        assertThat(testSitProf.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createSitProfWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sitProfRepository.findAll().size();

        // Create the SitProf with an existing ID
        sitProf.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSitProfMockMvc.perform(post("/api/sit-profs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sitProf)))
            .andExpect(status().isBadRequest());

        // Validate the SitProf in the database
        List<SitProf> sitProfList = sitProfRepository.findAll();
        assertThat(sitProfList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSitProfs() throws Exception {
        // Initialize the database
        sitProfRepository.saveAndFlush(sitProf);

        // Get all the sitProfList
        restSitProfMockMvc.perform(get("/api/sit-profs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sitProf.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getSitProf() throws Exception {
        // Initialize the database
        sitProfRepository.saveAndFlush(sitProf);

        // Get the sitProf
        restSitProfMockMvc.perform(get("/api/sit-profs/{id}", sitProf.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sitProf.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingSitProf() throws Exception {
        // Get the sitProf
        restSitProfMockMvc.perform(get("/api/sit-profs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSitProf() throws Exception {
        // Initialize the database
        sitProfRepository.saveAndFlush(sitProf);

        int databaseSizeBeforeUpdate = sitProfRepository.findAll().size();

        // Update the sitProf
        SitProf updatedSitProf = sitProfRepository.findById(sitProf.getId()).get();
        // Disconnect from session so that the updates on updatedSitProf are not directly saved in db
        em.detach(updatedSitProf);
        updatedSitProf
            .nome(UPDATED_NOME);

        restSitProfMockMvc.perform(put("/api/sit-profs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSitProf)))
            .andExpect(status().isOk());

        // Validate the SitProf in the database
        List<SitProf> sitProfList = sitProfRepository.findAll();
        assertThat(sitProfList).hasSize(databaseSizeBeforeUpdate);
        SitProf testSitProf = sitProfList.get(sitProfList.size() - 1);
        assertThat(testSitProf.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingSitProf() throws Exception {
        int databaseSizeBeforeUpdate = sitProfRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSitProfMockMvc.perform(put("/api/sit-profs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sitProf)))
            .andExpect(status().isBadRequest());

        // Validate the SitProf in the database
        List<SitProf> sitProfList = sitProfRepository.findAll();
        assertThat(sitProfList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSitProf() throws Exception {
        // Initialize the database
        sitProfRepository.saveAndFlush(sitProf);

        int databaseSizeBeforeDelete = sitProfRepository.findAll().size();

        // Delete the sitProf
        restSitProfMockMvc.perform(delete("/api/sit-profs/{id}", sitProf.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SitProf> sitProfList = sitProfRepository.findAll();
        assertThat(sitProfList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

package dw.dw.dw.web.rest;

import dw.dw.dw.Demografia2App;
import dw.dw.dw.domain.Aces;
import dw.dw.dw.repository.AcesRepository;

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
 * Integration tests for the {@link AcesResource} REST controller.
 */
@SpringBootTest(classes = Demografia2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class AcesResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private AcesRepository acesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAcesMockMvc;

    private Aces aces;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aces createEntity(EntityManager em) {
        Aces aces = new Aces()
            .nome(DEFAULT_NOME);
        return aces;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aces createUpdatedEntity(EntityManager em) {
        Aces aces = new Aces()
            .nome(UPDATED_NOME);
        return aces;
    }

    @BeforeEach
    public void initTest() {
        aces = createEntity(em);
    }

    @Test
    @Transactional
    public void createAces() throws Exception {
        int databaseSizeBeforeCreate = acesRepository.findAll().size();
        // Create the Aces
        restAcesMockMvc.perform(post("/api/aces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aces)))
            .andExpect(status().isCreated());

        // Validate the Aces in the database
        List<Aces> acesList = acesRepository.findAll();
        assertThat(acesList).hasSize(databaseSizeBeforeCreate + 1);
        Aces testAces = acesList.get(acesList.size() - 1);
        assertThat(testAces.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createAcesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = acesRepository.findAll().size();

        // Create the Aces with an existing ID
        aces.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcesMockMvc.perform(post("/api/aces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aces)))
            .andExpect(status().isBadRequest());

        // Validate the Aces in the database
        List<Aces> acesList = acesRepository.findAll();
        assertThat(acesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAces() throws Exception {
        // Initialize the database
        acesRepository.saveAndFlush(aces);

        // Get all the acesList
        restAcesMockMvc.perform(get("/api/aces?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aces.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getAces() throws Exception {
        // Initialize the database
        acesRepository.saveAndFlush(aces);

        // Get the aces
        restAcesMockMvc.perform(get("/api/aces/{id}", aces.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(aces.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingAces() throws Exception {
        // Get the aces
        restAcesMockMvc.perform(get("/api/aces/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAces() throws Exception {
        // Initialize the database
        acesRepository.saveAndFlush(aces);

        int databaseSizeBeforeUpdate = acesRepository.findAll().size();

        // Update the aces
        Aces updatedAces = acesRepository.findById(aces.getId()).get();
        // Disconnect from session so that the updates on updatedAces are not directly saved in db
        em.detach(updatedAces);
        updatedAces
            .nome(UPDATED_NOME);

        restAcesMockMvc.perform(put("/api/aces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAces)))
            .andExpect(status().isOk());

        // Validate the Aces in the database
        List<Aces> acesList = acesRepository.findAll();
        assertThat(acesList).hasSize(databaseSizeBeforeUpdate);
        Aces testAces = acesList.get(acesList.size() - 1);
        assertThat(testAces.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingAces() throws Exception {
        int databaseSizeBeforeUpdate = acesRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcesMockMvc.perform(put("/api/aces")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(aces)))
            .andExpect(status().isBadRequest());

        // Validate the Aces in the database
        List<Aces> acesList = acesRepository.findAll();
        assertThat(acesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAces() throws Exception {
        // Initialize the database
        acesRepository.saveAndFlush(aces);

        int databaseSizeBeforeDelete = acesRepository.findAll().size();

        // Delete the aces
        restAcesMockMvc.perform(delete("/api/aces/{id}", aces.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Aces> acesList = acesRepository.findAll();
        assertThat(acesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

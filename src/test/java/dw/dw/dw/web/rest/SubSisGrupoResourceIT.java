package dw.dw.dw.web.rest;

import dw.dw.dw.Demografia2App;
import dw.dw.dw.domain.SubSisGrupo;
import dw.dw.dw.repository.SubSisGrupoRepository;

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
 * Integration tests for the {@link SubSisGrupoResource} REST controller.
 */
@SpringBootTest(classes = Demografia2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class SubSisGrupoResourceIT {

    private static final String DEFAULT_GID_DESIGNA = "AAAAAAAAAA";
    private static final String UPDATED_GID_DESIGNA = "BBBBBBBBBB";

    private static final String DEFAULT_GID_GRUPO = "AAAAAAAAAA";
    private static final String UPDATED_GID_GRUPO = "BBBBBBBBBB";

    @Autowired
    private SubSisGrupoRepository subSisGrupoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubSisGrupoMockMvc;

    private SubSisGrupo subSisGrupo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubSisGrupo createEntity(EntityManager em) {
        SubSisGrupo subSisGrupo = new SubSisGrupo()
            .gidDesigna(DEFAULT_GID_DESIGNA)
            .gidGrupo(DEFAULT_GID_GRUPO);
        return subSisGrupo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubSisGrupo createUpdatedEntity(EntityManager em) {
        SubSisGrupo subSisGrupo = new SubSisGrupo()
            .gidDesigna(UPDATED_GID_DESIGNA)
            .gidGrupo(UPDATED_GID_GRUPO);
        return subSisGrupo;
    }

    @BeforeEach
    public void initTest() {
        subSisGrupo = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubSisGrupo() throws Exception {
        int databaseSizeBeforeCreate = subSisGrupoRepository.findAll().size();
        // Create the SubSisGrupo
        restSubSisGrupoMockMvc.perform(post("/api/sub-sis-grupos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subSisGrupo)))
            .andExpect(status().isCreated());

        // Validate the SubSisGrupo in the database
        List<SubSisGrupo> subSisGrupoList = subSisGrupoRepository.findAll();
        assertThat(subSisGrupoList).hasSize(databaseSizeBeforeCreate + 1);
        SubSisGrupo testSubSisGrupo = subSisGrupoList.get(subSisGrupoList.size() - 1);
        assertThat(testSubSisGrupo.getGidDesigna()).isEqualTo(DEFAULT_GID_DESIGNA);
        assertThat(testSubSisGrupo.getGidGrupo()).isEqualTo(DEFAULT_GID_GRUPO);
    }

    @Test
    @Transactional
    public void createSubSisGrupoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subSisGrupoRepository.findAll().size();

        // Create the SubSisGrupo with an existing ID
        subSisGrupo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubSisGrupoMockMvc.perform(post("/api/sub-sis-grupos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subSisGrupo)))
            .andExpect(status().isBadRequest());

        // Validate the SubSisGrupo in the database
        List<SubSisGrupo> subSisGrupoList = subSisGrupoRepository.findAll();
        assertThat(subSisGrupoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSubSisGrupos() throws Exception {
        // Initialize the database
        subSisGrupoRepository.saveAndFlush(subSisGrupo);

        // Get all the subSisGrupoList
        restSubSisGrupoMockMvc.perform(get("/api/sub-sis-grupos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subSisGrupo.getId().intValue())))
            .andExpect(jsonPath("$.[*].gidDesigna").value(hasItem(DEFAULT_GID_DESIGNA)))
            .andExpect(jsonPath("$.[*].gidGrupo").value(hasItem(DEFAULT_GID_GRUPO)));
    }
    
    @Test
    @Transactional
    public void getSubSisGrupo() throws Exception {
        // Initialize the database
        subSisGrupoRepository.saveAndFlush(subSisGrupo);

        // Get the subSisGrupo
        restSubSisGrupoMockMvc.perform(get("/api/sub-sis-grupos/{id}", subSisGrupo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subSisGrupo.getId().intValue()))
            .andExpect(jsonPath("$.gidDesigna").value(DEFAULT_GID_DESIGNA))
            .andExpect(jsonPath("$.gidGrupo").value(DEFAULT_GID_GRUPO));
    }
    @Test
    @Transactional
    public void getNonExistingSubSisGrupo() throws Exception {
        // Get the subSisGrupo
        restSubSisGrupoMockMvc.perform(get("/api/sub-sis-grupos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubSisGrupo() throws Exception {
        // Initialize the database
        subSisGrupoRepository.saveAndFlush(subSisGrupo);

        int databaseSizeBeforeUpdate = subSisGrupoRepository.findAll().size();

        // Update the subSisGrupo
        SubSisGrupo updatedSubSisGrupo = subSisGrupoRepository.findById(subSisGrupo.getId()).get();
        // Disconnect from session so that the updates on updatedSubSisGrupo are not directly saved in db
        em.detach(updatedSubSisGrupo);
        updatedSubSisGrupo
            .gidDesigna(UPDATED_GID_DESIGNA)
            .gidGrupo(UPDATED_GID_GRUPO);

        restSubSisGrupoMockMvc.perform(put("/api/sub-sis-grupos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubSisGrupo)))
            .andExpect(status().isOk());

        // Validate the SubSisGrupo in the database
        List<SubSisGrupo> subSisGrupoList = subSisGrupoRepository.findAll();
        assertThat(subSisGrupoList).hasSize(databaseSizeBeforeUpdate);
        SubSisGrupo testSubSisGrupo = subSisGrupoList.get(subSisGrupoList.size() - 1);
        assertThat(testSubSisGrupo.getGidDesigna()).isEqualTo(UPDATED_GID_DESIGNA);
        assertThat(testSubSisGrupo.getGidGrupo()).isEqualTo(UPDATED_GID_GRUPO);
    }

    @Test
    @Transactional
    public void updateNonExistingSubSisGrupo() throws Exception {
        int databaseSizeBeforeUpdate = subSisGrupoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubSisGrupoMockMvc.perform(put("/api/sub-sis-grupos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subSisGrupo)))
            .andExpect(status().isBadRequest());

        // Validate the SubSisGrupo in the database
        List<SubSisGrupo> subSisGrupoList = subSisGrupoRepository.findAll();
        assertThat(subSisGrupoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubSisGrupo() throws Exception {
        // Initialize the database
        subSisGrupoRepository.saveAndFlush(subSisGrupo);

        int databaseSizeBeforeDelete = subSisGrupoRepository.findAll().size();

        // Delete the subSisGrupo
        restSubSisGrupoMockMvc.perform(delete("/api/sub-sis-grupos/{id}", subSisGrupo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SubSisGrupo> subSisGrupoList = subSisGrupoRepository.findAll();
        assertThat(subSisGrupoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

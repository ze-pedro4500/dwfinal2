package dw.dw.dw.web.rest;

import dw.dw.dw.Demografia2App;
import dw.dw.dw.domain.DoenteDiagnosticoSocial;
import dw.dw.dw.repository.DoenteDiagnosticoSocialRepository;

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

/**
 * Integration tests for the {@link DoenteDiagnosticoSocialResource} REST controller.
 */
@SpringBootTest(classes = Demografia2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class DoenteDiagnosticoSocialResourceIT {

    private static final String DEFAULT_DESCR = "AAAAAAAAAA";
    private static final String UPDATED_DESCR = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private DoenteDiagnosticoSocialRepository doenteDiagnosticoSocialRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDoenteDiagnosticoSocialMockMvc;

    private DoenteDiagnosticoSocial doenteDiagnosticoSocial;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DoenteDiagnosticoSocial createEntity(EntityManager em) {
        DoenteDiagnosticoSocial doenteDiagnosticoSocial = new DoenteDiagnosticoSocial()
            .descr(DEFAULT_DESCR)
            .data(DEFAULT_DATA);
        return doenteDiagnosticoSocial;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DoenteDiagnosticoSocial createUpdatedEntity(EntityManager em) {
        DoenteDiagnosticoSocial doenteDiagnosticoSocial = new DoenteDiagnosticoSocial()
            .descr(UPDATED_DESCR)
            .data(UPDATED_DATA);
        return doenteDiagnosticoSocial;
    }

    @BeforeEach
    public void initTest() {
        doenteDiagnosticoSocial = createEntity(em);
    }

    @Test
    @Transactional
    public void createDoenteDiagnosticoSocial() throws Exception {
        int databaseSizeBeforeCreate = doenteDiagnosticoSocialRepository.findAll().size();
        // Create the DoenteDiagnosticoSocial
        restDoenteDiagnosticoSocialMockMvc.perform(post("/api/doente-diagnostico-socials")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doenteDiagnosticoSocial)))
            .andExpect(status().isCreated());

        // Validate the DoenteDiagnosticoSocial in the database
        List<DoenteDiagnosticoSocial> doenteDiagnosticoSocialList = doenteDiagnosticoSocialRepository.findAll();
        assertThat(doenteDiagnosticoSocialList).hasSize(databaseSizeBeforeCreate + 1);
        DoenteDiagnosticoSocial testDoenteDiagnosticoSocial = doenteDiagnosticoSocialList.get(doenteDiagnosticoSocialList.size() - 1);
        assertThat(testDoenteDiagnosticoSocial.getDescr()).isEqualTo(DEFAULT_DESCR);
        assertThat(testDoenteDiagnosticoSocial.getData()).isEqualTo(DEFAULT_DATA);
    }

    @Test
    @Transactional
    public void createDoenteDiagnosticoSocialWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = doenteDiagnosticoSocialRepository.findAll().size();

        // Create the DoenteDiagnosticoSocial with an existing ID
        doenteDiagnosticoSocial.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDoenteDiagnosticoSocialMockMvc.perform(post("/api/doente-diagnostico-socials")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doenteDiagnosticoSocial)))
            .andExpect(status().isBadRequest());

        // Validate the DoenteDiagnosticoSocial in the database
        List<DoenteDiagnosticoSocial> doenteDiagnosticoSocialList = doenteDiagnosticoSocialRepository.findAll();
        assertThat(doenteDiagnosticoSocialList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDoenteDiagnosticoSocials() throws Exception {
        // Initialize the database
        doenteDiagnosticoSocialRepository.saveAndFlush(doenteDiagnosticoSocial);

        // Get all the doenteDiagnosticoSocialList
        restDoenteDiagnosticoSocialMockMvc.perform(get("/api/doente-diagnostico-socials?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(doenteDiagnosticoSocial.getId().intValue())))
            .andExpect(jsonPath("$.[*].descr").value(hasItem(DEFAULT_DESCR)))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())));
    }
    
    @Test
    @Transactional
    public void getDoenteDiagnosticoSocial() throws Exception {
        // Initialize the database
        doenteDiagnosticoSocialRepository.saveAndFlush(doenteDiagnosticoSocial);

        // Get the doenteDiagnosticoSocial
        restDoenteDiagnosticoSocialMockMvc.perform(get("/api/doente-diagnostico-socials/{id}", doenteDiagnosticoSocial.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(doenteDiagnosticoSocial.getId().intValue()))
            .andExpect(jsonPath("$.descr").value(DEFAULT_DESCR))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDoenteDiagnosticoSocial() throws Exception {
        // Get the doenteDiagnosticoSocial
        restDoenteDiagnosticoSocialMockMvc.perform(get("/api/doente-diagnostico-socials/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDoenteDiagnosticoSocial() throws Exception {
        // Initialize the database
        doenteDiagnosticoSocialRepository.saveAndFlush(doenteDiagnosticoSocial);

        int databaseSizeBeforeUpdate = doenteDiagnosticoSocialRepository.findAll().size();

        // Update the doenteDiagnosticoSocial
        DoenteDiagnosticoSocial updatedDoenteDiagnosticoSocial = doenteDiagnosticoSocialRepository.findById(doenteDiagnosticoSocial.getId()).get();
        // Disconnect from session so that the updates on updatedDoenteDiagnosticoSocial are not directly saved in db
        em.detach(updatedDoenteDiagnosticoSocial);
        updatedDoenteDiagnosticoSocial
            .descr(UPDATED_DESCR)
            .data(UPDATED_DATA);

        restDoenteDiagnosticoSocialMockMvc.perform(put("/api/doente-diagnostico-socials")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDoenteDiagnosticoSocial)))
            .andExpect(status().isOk());

        // Validate the DoenteDiagnosticoSocial in the database
        List<DoenteDiagnosticoSocial> doenteDiagnosticoSocialList = doenteDiagnosticoSocialRepository.findAll();
        assertThat(doenteDiagnosticoSocialList).hasSize(databaseSizeBeforeUpdate);
        DoenteDiagnosticoSocial testDoenteDiagnosticoSocial = doenteDiagnosticoSocialList.get(doenteDiagnosticoSocialList.size() - 1);
        assertThat(testDoenteDiagnosticoSocial.getDescr()).isEqualTo(UPDATED_DESCR);
        assertThat(testDoenteDiagnosticoSocial.getData()).isEqualTo(UPDATED_DATA);
    }

    @Test
    @Transactional
    public void updateNonExistingDoenteDiagnosticoSocial() throws Exception {
        int databaseSizeBeforeUpdate = doenteDiagnosticoSocialRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDoenteDiagnosticoSocialMockMvc.perform(put("/api/doente-diagnostico-socials")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doenteDiagnosticoSocial)))
            .andExpect(status().isBadRequest());

        // Validate the DoenteDiagnosticoSocial in the database
        List<DoenteDiagnosticoSocial> doenteDiagnosticoSocialList = doenteDiagnosticoSocialRepository.findAll();
        assertThat(doenteDiagnosticoSocialList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDoenteDiagnosticoSocial() throws Exception {
        // Initialize the database
        doenteDiagnosticoSocialRepository.saveAndFlush(doenteDiagnosticoSocial);

        int databaseSizeBeforeDelete = doenteDiagnosticoSocialRepository.findAll().size();

        // Delete the doenteDiagnosticoSocial
        restDoenteDiagnosticoSocialMockMvc.perform(delete("/api/doente-diagnostico-socials/{id}", doenteDiagnosticoSocial.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DoenteDiagnosticoSocial> doenteDiagnosticoSocialList = doenteDiagnosticoSocialRepository.findAll();
        assertThat(doenteDiagnosticoSocialList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

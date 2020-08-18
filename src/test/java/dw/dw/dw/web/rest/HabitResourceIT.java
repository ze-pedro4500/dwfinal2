package dw.dw.dw.web.rest;

import dw.dw.dw.Demografia2App;
import dw.dw.dw.domain.Habit;
import dw.dw.dw.repository.HabitRepository;

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
 * Integration tests for the {@link HabitResource} REST controller.
 */
@SpringBootTest(classes = Demografia2App.class)
@AutoConfigureMockMvc
@WithMockUser
public class HabitResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private HabitRepository habitRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHabitMockMvc;

    private Habit habit;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Habit createEntity(EntityManager em) {
        Habit habit = new Habit()
            .nome(DEFAULT_NOME);
        return habit;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Habit createUpdatedEntity(EntityManager em) {
        Habit habit = new Habit()
            .nome(UPDATED_NOME);
        return habit;
    }

    @BeforeEach
    public void initTest() {
        habit = createEntity(em);
    }

    @Test
    @Transactional
    public void createHabit() throws Exception {
        int databaseSizeBeforeCreate = habitRepository.findAll().size();
        // Create the Habit
        restHabitMockMvc.perform(post("/api/habits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(habit)))
            .andExpect(status().isCreated());

        // Validate the Habit in the database
        List<Habit> habitList = habitRepository.findAll();
        assertThat(habitList).hasSize(databaseSizeBeforeCreate + 1);
        Habit testHabit = habitList.get(habitList.size() - 1);
        assertThat(testHabit.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createHabitWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = habitRepository.findAll().size();

        // Create the Habit with an existing ID
        habit.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHabitMockMvc.perform(post("/api/habits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(habit)))
            .andExpect(status().isBadRequest());

        // Validate the Habit in the database
        List<Habit> habitList = habitRepository.findAll();
        assertThat(habitList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllHabits() throws Exception {
        // Initialize the database
        habitRepository.saveAndFlush(habit);

        // Get all the habitList
        restHabitMockMvc.perform(get("/api/habits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(habit.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getHabit() throws Exception {
        // Initialize the database
        habitRepository.saveAndFlush(habit);

        // Get the habit
        restHabitMockMvc.perform(get("/api/habits/{id}", habit.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(habit.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingHabit() throws Exception {
        // Get the habit
        restHabitMockMvc.perform(get("/api/habits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHabit() throws Exception {
        // Initialize the database
        habitRepository.saveAndFlush(habit);

        int databaseSizeBeforeUpdate = habitRepository.findAll().size();

        // Update the habit
        Habit updatedHabit = habitRepository.findById(habit.getId()).get();
        // Disconnect from session so that the updates on updatedHabit are not directly saved in db
        em.detach(updatedHabit);
        updatedHabit
            .nome(UPDATED_NOME);

        restHabitMockMvc.perform(put("/api/habits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHabit)))
            .andExpect(status().isOk());

        // Validate the Habit in the database
        List<Habit> habitList = habitRepository.findAll();
        assertThat(habitList).hasSize(databaseSizeBeforeUpdate);
        Habit testHabit = habitList.get(habitList.size() - 1);
        assertThat(testHabit.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingHabit() throws Exception {
        int databaseSizeBeforeUpdate = habitRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHabitMockMvc.perform(put("/api/habits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(habit)))
            .andExpect(status().isBadRequest());

        // Validate the Habit in the database
        List<Habit> habitList = habitRepository.findAll();
        assertThat(habitList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHabit() throws Exception {
        // Initialize the database
        habitRepository.saveAndFlush(habit);

        int databaseSizeBeforeDelete = habitRepository.findAll().size();

        // Delete the habit
        restHabitMockMvc.perform(delete("/api/habits/{id}", habit.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Habit> habitList = habitRepository.findAll();
        assertThat(habitList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

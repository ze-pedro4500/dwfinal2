package dw.dw.dw.web.rest;

import dw.dw.dw.domain.Habit;
import dw.dw.dw.repository.HabitRepository;
import dw.dw.dw.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link dw.dw.dw.domain.Habit}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class HabitResource {

    private final Logger log = LoggerFactory.getLogger(HabitResource.class);

    private static final String ENTITY_NAME = "habit";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HabitRepository habitRepository;

    public HabitResource(HabitRepository habitRepository) {
        this.habitRepository = habitRepository;
    }

    /**
     * {@code POST  /habits} : Create a new habit.
     *
     * @param habit the habit to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new habit, or with status {@code 400 (Bad Request)} if the habit has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/habits")
    public ResponseEntity<Habit> createHabit(@RequestBody Habit habit) throws URISyntaxException {
        log.debug("REST request to save Habit : {}", habit);
        if (habit.getId() != null) {
            throw new BadRequestAlertException("A new habit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Habit result = habitRepository.save(habit);
        return ResponseEntity.created(new URI("/api/habits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /habits} : Updates an existing habit.
     *
     * @param habit the habit to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated habit,
     * or with status {@code 400 (Bad Request)} if the habit is not valid,
     * or with status {@code 500 (Internal Server Error)} if the habit couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/habits")
    public ResponseEntity<Habit> updateHabit(@RequestBody Habit habit) throws URISyntaxException {
        log.debug("REST request to update Habit : {}", habit);
        if (habit.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Habit result = habitRepository.save(habit);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, habit.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /habits} : get all the habits.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of habits in body.
     */
    @GetMapping("/habits")
    public List<Habit> getAllHabits() {
        log.debug("REST request to get all Habits");
        return habitRepository.findAll();
    }

    /**
     * {@code GET  /habits/:id} : get the "id" habit.
     *
     * @param id the id of the habit to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the habit, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/habits/{id}")
    public ResponseEntity<Habit> getHabit(@PathVariable Long id) {
        log.debug("REST request to get Habit : {}", id);
        Optional<Habit> habit = habitRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(habit);
    }

    /**
     * {@code DELETE  /habits/:id} : delete the "id" habit.
     *
     * @param id the id of the habit to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/habits/{id}")
    public ResponseEntity<Void> deleteHabit(@PathVariable Long id) {
        log.debug("REST request to delete Habit : {}", id);
        habitRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}

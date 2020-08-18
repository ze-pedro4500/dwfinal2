package dw.dw.dw.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import dw.dw.dw.web.rest.TestUtil;

public class HabitTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Habit.class);
        Habit habit1 = new Habit();
        habit1.setId(1L);
        Habit habit2 = new Habit();
        habit2.setId(habit1.getId());
        assertThat(habit1).isEqualTo(habit2);
        habit2.setId(2L);
        assertThat(habit1).isNotEqualTo(habit2);
        habit1.setId(null);
        assertThat(habit1).isNotEqualTo(habit2);
    }
}

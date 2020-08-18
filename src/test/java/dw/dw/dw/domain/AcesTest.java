package dw.dw.dw.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import dw.dw.dw.web.rest.TestUtil;

public class AcesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Aces.class);
        Aces aces1 = new Aces();
        aces1.setId(1L);
        Aces aces2 = new Aces();
        aces2.setId(aces1.getId());
        assertThat(aces1).isEqualTo(aces2);
        aces2.setId(2L);
        assertThat(aces1).isNotEqualTo(aces2);
        aces1.setId(null);
        assertThat(aces1).isNotEqualTo(aces2);
    }
}

package dw.dw.dw.service;

import dw.dw.dw.domain.DoenteDiagnosticoSocial;
import dw.dw.dw.repository.DoenteDiagnosticoSocialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DoenteDiagnosticoSocialService {

    @Autowired
    private DoenteDiagnosticoSocialRepository doenteDiagnosticoSocialRepository;

    public DoenteDiagnosticoSocial findByDoente(Long doente) {
        List<DoenteDiagnosticoSocial> doenteDiagnosticoSocials;
        doenteDiagnosticoSocials = doenteDiagnosticoSocialRepository.findAllByDoenteId(doente);
        DoenteDiagnosticoSocial doenteDiagnostico = doenteDiagnosticoSocials.get(0);
        return doenteDiagnostico;
    }

    public List<DoenteDiagnosticoSocial> findAllByDoente(Long doente) {
        List<DoenteDiagnosticoSocial> doenteDiagnosticoSocials;
        doenteDiagnosticoSocials = doenteDiagnosticoSocialRepository.findAllByDoenteId(doente);
        List<DoenteDiagnosticoSocial> doenteDiagnostico = doenteDiagnosticoSocials;
        return doenteDiagnostico;
    }
}

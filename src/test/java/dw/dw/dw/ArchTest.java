package dw.dw.dw;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("dw.dw.dw");

        noClasses()
            .that()
                .resideInAnyPackage("dw.dw.dw.service..")
            .or()
                .resideInAnyPackage("dw.dw.dw.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..dw.dw.dw.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}

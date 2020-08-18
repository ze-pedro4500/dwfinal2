import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'vitalidade',
        loadChildren: () => import('./vitalidade/vitalidade.module').then(m => m.Demografia2VitalidadeModule)
      },
      {
        path: 'aces',
        loadChildren: () => import('./aces/aces.module').then(m => m.Demografia2AcesModule)
      },
      {
        path: 'doente',
        loadChildren: () => import('./doente/doente.module').then(m => m.Demografia2DoenteModule)
      },
      {
        path: 'doente-identidade',
        loadChildren: () => import('./doente-identidade/doente-identidade.module').then(m => m.Demografia2DoenteIdentidadeModule)
      },
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.Demografia2CountryModule)
      },
      {
        path: 'doente-contactos',
        loadChildren: () => import('./doente-contactos/doente-contactos.module').then(m => m.Demografia2DoenteContactosModule)
      },
      {
        path: 'doente-contactos-outros',
        loadChildren: () =>
          import('./doente-contactos-outros/doente-contactos-outros.module').then(m => m.Demografia2DoenteContactosOutrosModule)
      },
      {
        path: 'sit-prof',
        loadChildren: () => import('./sit-prof/sit-prof.module').then(m => m.Demografia2SitProfModule)
      },
      {
        path: 'profissao',
        loadChildren: () => import('./profissao/profissao.module').then(m => m.Demografia2ProfissaoModule)
      },
      {
        path: 'doente-socio-familiar',
        loadChildren: () => import('./doente-socio-familiar/doente-socio-familiar.module').then(m => m.Demografia2DoenteSocioFamiliarModule)
      },
      {
        path: 'doente-diagnostico-social',
        loadChildren: () =>
          import('./doente-diagnostico-social/doente-diagnostico-social.module').then(m => m.Demografia2DoenteDiagnosticoSocialModule)
      },
      {
        path: 'doente-registos-intervencoes',
        loadChildren: () =>
          import('./doente-registos-intervencoes/doente-registos-intervencoes.module').then(
            m => m.Demografia2DoenteRegistosIntervencoesModule
          )
      },
      {
        path: 'doente-hist-movimentos',
        loadChildren: () =>
          import('./doente-hist-movimentos/doente-hist-movimentos.module').then(m => m.Demografia2DoenteHistMovimentosModule)
      },
      {
        path: 'horario-doente',
        loadChildren: () => import('./horario-doente/horario-doente.module').then(m => m.Demografia2HorarioDoenteModule)
      },
      {
        path: 'sub-sistemas',
        loadChildren: () => import('./sub-sistemas/sub-sistemas.module').then(m => m.Demografia2SubSistemasModule)
      },
      {
        path: 'sub-sis-grupo',
        loadChildren: () => import('./sub-sis-grupo/sub-sis-grupo.module').then(m => m.Demografia2SubSisGrupoModule)
      },
      {
        path: 'turnos',
        loadChildren: () => import('./turnos/turnos.module').then(m => m.Demografia2TurnosModule)
      },
      {
        path: 'centro-saude',
        loadChildren: () => import('./centro-saude/centro-saude.module').then(m => m.Demografia2CentroSaudeModule)
      },
      {
        path: 'hosp-ref',
        loadChildren: () => import('./hosp-ref/hosp-ref.module').then(m => m.Demografia2HospRefModule)
      },
      {
        path: 'habit',
        loadChildren: () => import('./habit/habit.module').then(m => m.Demografia2HabitModule)
      },
      {
        path: 'grau-conf',
        loadChildren: () => import('./grau-conf/grau-conf.module').then(m => m.Demografia2GrauConfModule)
      },
      {
        path: 'user-extra',
        loadChildren: () => import('./user-extra/user-extra.module').then(m => m.Demografia2UserExtraModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('./user-profile/user-profile.module').then(m => m.Demografia2UserProfileModule)
      },
      {
        path: 'user-permissions',
        loadChildren: () => import('./user-permissions/user-permissions.module').then(m => m.Demografia2UserPermissionsModule)
      },
      {
        path: 'demografia',
        loadChildren: () => import('./demografia/demografia.module').then(m => m.DemografiaModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class Demografia2EntityModule {}

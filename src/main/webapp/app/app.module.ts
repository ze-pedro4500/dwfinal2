import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { Demografia2SharedModule } from 'app/shared/shared.module';
import { Demografia2CoreModule } from 'app/core/core.module';
import { Demografia2AppRoutingModule } from './app-routing.module';
import { Demografia2HomeModule } from './home/home.module';
import { Demografia2EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    Demografia2SharedModule,
    Demografia2CoreModule,
    Demografia2HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    Demografia2EntityModule,
    Demografia2AppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class Demografia2AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigComponent } from './config/config.component';
import { DeleteComponent } from './delete/delete.component';
import { UsernameInputDirective } from './directives/username-input.directive';
import { HomeComponent } from './home/home.component';
import { MostViewedComponent } from './most-viewed/most-viewed.component';
import { PlayerComponent } from './player/player.component';
import { QuestsPanelComponent } from './player/quests-panel/quests-panel.component';
import { SkillComponent } from './player/skills-panel/skill/skill.component';
import { SkillsPanelComponent } from './player/skills-panel/skills-panel.component';
import { SummaryCardComponent } from './player/summary-panel/summary-card/summary-card.component';
import { SummaryPanelComponent } from './player/summary-panel/summary-panel.component';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayerComponent,
    UsernameInputDirective,
    SummaryPanelComponent,
    SkillsPanelComponent,
    SkillComponent,
    QuestsPanelComponent,
    ConfigComponent,
    SummaryCardComponent,
    DeleteComponent,
    MostViewedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    HttpClientModule,
    MatProgressBarModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
  ],
  providers: [CookieService, HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}

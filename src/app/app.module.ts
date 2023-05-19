import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsernameInputDirective } from './directives/username-input.directive';
import { SummaryPanelComponent } from './player/summary-panel/summary-panel.component';
import { QuestsPanelComponent } from './player/quests-panel/quests-panel.component';
import { SkillsPanelComponent } from './player/skills-panel/skills-panel.component';
import { SkillComponent } from './player/skills-panel/skill/skill.component';
import { ConfigComponent } from './config/config.component';
import { CookieService } from 'ngx-cookie-service';
import { SummaryCardComponent } from './player/summary-panel/summary-card/summary-card.component';

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
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}

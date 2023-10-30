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
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { UsernameInputDirective } from '../directives/username-input.directive';
import { HttpService } from '../services/http.service';
import { LoadingService } from '../services/loading.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ConfigComponent } from './config/config.component';
import { DeleteComponent } from './delete/delete.component';
import { HomeComponent } from './home/home.component';
import { MostViewedComponent } from './most-viewed/most-viewed.component';
import { BossesPanelComponent } from './player/bosses-panel/bosses-panel.component';
import { CombatTaskGroupComponent } from './player/combat-tasks-panel/combat-task-group/combat-task-group.component';
import { CombatTasksListComponent } from './player/combat-tasks-panel/combat-task-group/combat-task-list/combat-task-list.component';
import { CombatTasksComponent } from './player/combat-tasks-panel/combat-tasks-panel.component';
import { DiariesPanelComponent } from './player/diaries-panel/diaries-panel.component';
import { DiaryComponent } from './player/diaries-panel/diary/diary.component';
import { InfoPanelComponent } from './player/info-panel/info-panel.component';
import { MinigamesPanelComponent } from './player/minigames-panel/minigames-panel.component';
import { ModelPanelComponent } from './player/model-panel/model-panel.component';
import { PlayerComponent } from './player/player.component';
import { QuestsPanelComponent } from './player/quests-panel/quests-panel.component';
import { SkillComponent } from './player/skills-panel/skill/skill.component';
import { SkillsPanelComponent } from './player/skills-panel/skills-panel.component';
import { AccountBadgeComponent } from './player/summary-panel/account-badge/account-badge.component';
import { SummaryCardComponent } from './player/summary-panel/summary-card/summary-card.component';
import { SummaryPanelComponent } from './player/summary-panel/summary-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeleteComponent,
    MostViewedComponent,
    ConfigComponent,
    PlayerComponent,
    UsernameInputDirective,
    AccountBadgeComponent,
    BarChartComponent,
    InfoPanelComponent,

    ModelPanelComponent,

    SummaryPanelComponent,
    SummaryCardComponent,

    SkillsPanelComponent,
    SkillComponent,

    QuestsPanelComponent,

    DiariesPanelComponent,
    DiaryComponent,

    CombatTasksComponent,
    CombatTaskGroupComponent,
    CombatTasksListComponent,

    BossesPanelComponent,

    MinigamesPanelComponent,
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
    MatMenuModule,
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
    MatSortModule,
    SatPopoverModule,
  ],
  providers: [HttpService, LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}

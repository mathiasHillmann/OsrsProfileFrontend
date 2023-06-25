import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { HomeComponent } from './home/home.component';
import { MostViewedComponent } from './most-viewed/most-viewed.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  { path: 'player/:username', component: PlayerComponent },
  { path: 'delete', component: DeleteComponent },
  { path: 'most-viewed', component: MostViewedComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

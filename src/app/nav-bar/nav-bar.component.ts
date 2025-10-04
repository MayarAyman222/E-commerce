import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../dashBord/service/theme.service';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink , CommonModule , RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isDark = false;
  constructor(public theme: ThemeService) {
    this.theme.isDark$.subscribe(v => this.isDark = v);
  }

  toggle() {
    this.theme.toggle();
  }
}

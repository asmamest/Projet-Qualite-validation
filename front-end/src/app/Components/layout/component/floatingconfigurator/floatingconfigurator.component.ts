import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { ConfiguratorComponent } from '../configurator/configurator.component';
import { LayoutService } from '../../layout.service';
@Component({
  selector: 'app-floatingconfigurator',
  standalone: false,
  templateUrl: './floatingconfigurator.component.html',
  styleUrl: './floatingconfigurator.component.css',
})
export class FloatingconfiguratorComponent {
  LayoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme);

  toggleDarkMode() {
    this.LayoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }
}

import { Component } from '@angular/core';

import { ElectronService } from 'ngx-electron-fresh';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private ElectronService: ElectronService) {
    this.ElectronService.ipcRenderer.on('risposta', () => {
      console.log('Ho ricevuto una risposta');
    });
  }

  prova() {
    if (this.ElectronService.isElectronApp) {
      this.ElectronService.ipcRenderer.send('prova');
    }
    console.log('prova');
  }
}

import { Component, OnInit } from '@angular/core';
import { IonIcon, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';

@Component({
  selector: 'app-panel-inferior',
  templateUrl: './panel-inferior.component.html',
  styleUrls: ['./panel-inferior.component.scss'],
  imports: [IonIcon, IonTabBar, IonTabButton, IonTabs],
})
export class PanelInferiorComponent  implements OnInit {

  constructor() {
    addIcons({ library, playCircle, radio, search });
  }
  ngOnInit() {}

}

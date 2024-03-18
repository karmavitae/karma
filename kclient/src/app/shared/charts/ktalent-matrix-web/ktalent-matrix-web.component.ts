import { Component, Input } from '@angular/core';
import { IS2N } from '../../../../../../common/interfaces/igen';
import { Global } from '../../classes/global';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ktalent-matrix-web',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './ktalent-matrix-web.component.html',
  styleUrl: './ktalent-matrix-web.component.scss'
})
export class KtalentMatrixWebComponent {
  @Input('legendCount') legendCount!:IS2N
  levels = Global.levels
  startX=1
  blockWidth=128.5
  blockHeight=50
  isDarkMode!:Observable<boolean>

  constructor(
    private theme$:ThemeService
  ) {}

  ngOnInit(): void {
    this.isDarkMode = this.theme$.getActiveTheme()
    this.blockWidth = (900/this.levels.length)
  }
  

}

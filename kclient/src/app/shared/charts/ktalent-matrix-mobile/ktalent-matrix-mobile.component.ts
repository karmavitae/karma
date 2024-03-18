import { Component, Input } from '@angular/core';
import { IS2N } from '../../../../../../common/interfaces/igen';
import { Global } from '../../classes/global';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-ktalent-matrix-mobile',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './ktalent-matrix-mobile.component.html',
  styleUrl: './ktalent-matrix-mobile.component.scss'
})
export class KtalentMatrixMobileComponent {
  @Input('legendCount') legendCount!:IS2N
  @Input('rowGap') gap!: number


  levels = Global.levels
  startX=1
  blockWidth=128.5
  blockHeight=50
  isDarkMode!:Observable<boolean>

  constructor(
    private theme$:ThemeService
  ) {}

  ngOnInit(): void {
    this.gap = this.gap ? this.gap : 70
    this.isDarkMode = this.theme$.getActiveTheme()
    this.blockWidth = (440/4)
  }
}

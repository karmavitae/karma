import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { IS2S } from '../../../../../../common/interfaces/igen';
import { ThemeService } from '../../services/theme.service';
import { ResponsiveService } from '../../services/responsive.service';
import { KindexService, IIndexItem } from './kindex.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import { AsyncPipe, KeyValuePipe, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { KspinnerService } from '../kspinner/kspinner.service';

@Component({
  selector: 'app-kindex',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatTableModule,
    AsyncPipe,
    KeyValuePipe,
    NgClass,
    MatButtonModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './kindex.component.html',
  styleUrl: './kindex.component.scss'
})
export class KindexComponent {
  @Input('karmaObject') karmaObject!:string
  @Input('isHideMenu') isHideMenu!:boolean
  @Input('returnField') retrunField!:string
  @Output('onAction') onAction:EventEmitter<string|number> = new EventEmitter()

  searchControl!:FormControl
  selectControl!:FormControl

  isDarkMode!:Observable<boolean>
  isMobile!:Observable<boolean>

  displayMeta!:IS2S
  displayColumns!:string[]
  searchColumns!:IS2S

  options!:Observable<IIndexItem[]>
  dataSource!:Observable<IIndexItem[]>

  constructor(
    private theme$: ThemeService,
    private kindex$: KindexService,
    private responsive$: ResponsiveService,
    private kspinner$: KspinnerService
  ) {
    this.searchControl = new FormControl('', [])
    this.selectControl = new FormControl('', [])
    this.isDarkMode = this.theme$.getActiveTheme()
    this.isMobile = this.responsive$.checkIsMobile()
  }
  ngOnInit(): void {
    this.kspinner$.showSpinner()
    this.retrunField = this.retrunField ? this.retrunField : '_id'
    this.displayMeta= this.kindex$.getDisplayColumns(this.karmaObject)
    this.searchColumns = this.kindex$.getSearchColumns(this.karmaObject)
    this.selectControl.setValue(Object.values(this.searchColumns)[0])
    this.displayColumns = Object.keys(this.displayMeta)
    this.dataSource = this.kindex$.getDisplayData(this.karmaObject, 0,0,'')
  }

  loadItem(row:IIndexItem) {
    this.openSelected(row)
  }

  openSelected(item:IIndexItem) {
    if(Object.keys(item).length>0) {
      if(item['_id']) {
        this.onAction.emit(item['_id'])
      }else{
        this.onAction.emit(-1)
      }
    }else{
      this.onAction.emit(0)
    }
  }
  create() {
    this.onAction.emit(0)
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule],
  providers: [provideMomentDateAdapter(MY_FORMATS)],
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.scss'
})
export class DateRangePickerComponent {
  @Input() titleLabel: string = '';
  @Output() changeStartDateEvent = new EventEmitter<any>();
  @Output() changeEndDateEvent = new EventEmitter<any>();

  handleStartDateChange(event: any) {
    this.changeStartDateEvent.emit(event.value);
  }
  
  handleEndDateChange(event: any) {
    this.changeEndDateEvent.emit(event.value);
  }
}

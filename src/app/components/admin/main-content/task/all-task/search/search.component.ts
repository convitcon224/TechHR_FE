import { Component } from '@angular/core';
import { DateRangePickerComponent } from '../../../../../commons/date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-search-task',
  standalone: true,
  imports: [DateRangePickerComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newdate',
  pure: false
})
export class NewDatePipe implements PipeTransform {

  transform(date: any) {
    return new Date(date)
  }
}

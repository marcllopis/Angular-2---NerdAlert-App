import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(users: any[], filters: any[]) {

    if (!users) {
        return []
    }

    var firstUsers = []
    var uniqueUsers = []


    users.forEach(function(user){
      filters.forEach(function(filter){
        (user.speciality).forEach(function(speciality){
          if(speciality === filter){
            firstUsers.push(user)
          }
        })
      })
    })


    uniqueUsers = firstUsers.filter(function(item, pos) {
        return firstUsers.indexOf(item) == pos;
    })

    return uniqueUsers
}
}

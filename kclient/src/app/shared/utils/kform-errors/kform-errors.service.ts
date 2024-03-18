import { Injectable } from '@angular/core';
import { IS2S } from '../../../../../../common/interfaces/igen';

@Injectable({
  providedIn: 'root'
})
export class KformErrorsService {

  constructor() { }

  getErrorMessge(fieldName:string, errorType:string): string {   
    let message = ''
    switch(errorType) {
      case 'email': {
        message = "Valid Email address."
        break
      }
      case 'required' : {
        let name = this.formatFieldName(fieldName)
        message = `${name} field is required`
        break
      }
      default: {
        let name = this.formatFieldName(fieldName)
        message = `${name} field is invalid`
        break
      }
    }
    return message
  }

  formatFieldName(fieldName:string): string {
    let result:string = ''
    if(fieldName.includes('_')){
      let fieldNames = fieldName.split('_')
      fieldNames.forEach(name => {
        result = result + ' ' + this.capitalizeFirstLetter(name)
      })
    } else {
      result = this.capitalizeFirstLetter(fieldName)
    }
    return result.trim()
  }

  capitalizeFirstLetter(str:string): string {
    if (!str) return '';
    var firstCodeUnit = str[0];
    if (firstCodeUnit < '\uD800' || firstCodeUnit > '\uDFFF') {
      return str[0].toUpperCase() + str.slice(1);
    }
    return str.slice(0, 2).toUpperCase() + str.slice(2);
  }
}

import  {Validator,NG_VALIDATORS,AbstractControl} from '@angular/forms'
import { Directive, Input } from '@angular/core';

@Directive({
    selector:'[appConfirmEqualValidator]',//selector for confirming password
    //syntax for mentioning all custom validators 
    providers:[{
          provide:NG_VALIDATORS,
          useExisting:ConfirmEqualValidatorDirective,
          multi:true //it is property to tell angular to include custom validators
        }]
   })
    
export class ConfirmEqualValidatorDirective implements Validator {
   @Input() appConfirmEqualValidator:string;
    validate(control:AbstractControl):{[key:string]:any}|null{
        const controlToCompare=control.parent.get(this.appConfirmEqualValidator);
        if(controlToCompare && controlToCompare.value!==control.value){
            return {'notEqual':true}
        }
         return null;
    }




}
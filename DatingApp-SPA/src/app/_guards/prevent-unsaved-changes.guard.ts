import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.introduction !== component.user.introduction
            || component.lookingFor !== component.user.lookingFor
            || component.interests !== component.user.interests
            || component.city !== component.user.city
            || component.country !== component.user.country
            ) {
                return confirm('Are you sure? You want to continue? Any unsaved changes will be lost');
        }
        return true;
    }
}

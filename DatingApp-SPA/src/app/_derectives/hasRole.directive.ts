import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit{
  @Input() appHasRole: string[];
  isVisible = false;

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>, private authService: AuthService) { }

  ngOnInit() {
    const UserRoles = this.authService.decodedToken.role as Array<string>;
    // if no roles clear the viewContainerRef
    if (!UserRoles) {
      this.viewContainerRef.clear();
    }

    // if user has role need then render the element
    if (this.authService.roleMatch(this.appHasRole)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }

}

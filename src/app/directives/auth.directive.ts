import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective implements OnInit {

	constructor(private element: ElementRef) { }
	
	ngOnInit() {
		this.element.nativeElement.style.display = 'flex'
		this.element.nativeElement.style.justifyContent = 'space-around'
		this.element.nativeElement.style.alignItems = 'center'
	}

}

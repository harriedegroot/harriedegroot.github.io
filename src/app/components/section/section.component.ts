import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScrollTrigger } from 'gsap/all';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit, AfterViewInit {

  private static COUNTER:number = 0;

  readonly id: string = `section_${++SectionComponent.COUNTER}`;
  get height() { return this.fullPage ? '100vh' : 'auto' }

  @Output('shown') public readonly shownEmitter = new EventEmitter<void>();
  @Output('hidden') public readonly hiddenEmitter = new EventEmitter<void>();
  @Output('visible') public readonly visibleEmitter = new EventEmitter<boolean>();
  
  private readonly _nextEmitter = new EventEmitter<void>();
  @Output('next') public get nextEmitter() {
    this._showNext = true;
    return this._nextEmitter;
  }

  @Input() background = 'none';
  @Input() fullPage: boolean = false;
  @Input() title?: string;

  private _visible: boolean = false;
  public get visible(): boolean {
    return this._visible;
  }

  private _showNext: boolean = false;
  get showNext():boolean {
    return this._showNext;
  }

  private _initialized: boolean = false;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    ScrollTrigger.create({
      trigger: "#" + this.id,
      start: "top bottom",
      onToggle: self => this._setVisibility(self.isActive),
    });
  }

  private _setVisibility(value: boolean) {
    if(this._visible != value) {
      this._visible = value;
      if(value) {
        if(!this._initialized) {
          this.showTitle();
        }
        this.shownEmitter.emit();
      } else {
        this.hiddenEmitter.emit();
      }
      this.visibleEmitter.emit(value);
    }
  }

  onNextClick() {
    this.nextEmitter.emit();
  }

  public showTitle(animate: boolean = true) {

  }

  public hideTitle(animate: boolean = true) {

  }
}

import { Component, Input, OnInit } from '@angular/core';
import { fadeAnimation } from 'app/helpers/animations';
import gsap from 'gsap';
import { loadFull } from 'tsparticles';
import {
  Engine,
  MoveDirection,
  OutMode
} from 'tsparticles-engine';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  animations: [fadeAnimation],
})
export class BackgroundComponent implements OnInit {
  id = 'background_particles';
  particlesOptions?: any;

  private _enabled: boolean = true;
  public get enabled(): boolean {
    return this._enabled;
  }
  @Input()
  public set enabled(value: boolean) {
    if(this._enabled !== value) {
      this._enabled = value;
      if(value) {
        this.fadeIn(2)
      }
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.fadeIn(4);
  }

  private _fadeTween?: gsap.core.Tween;
  private fadeIn(delay: number = 0) {
    if(!this._fadeTween) {
      this._fadeTween = gsap.from('.particles-container', {
        opacity: 0,
        duration: 10,
        delay: delay,
        onStart: () => this.start(),
      });
    } else {
      this._fadeTween.delay(delay);
      this._fadeTween.restart();
    }
  }

  private start() {
    this.particlesOptions = {
      background: {
        color: {
          value: 'white',
        },
      },
      fpsLimit: 30,
      particles: {
        color: {
          //value: '#000000',
          value: '#c2185b',
        },
        links: {
          color: '#000000',
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: false,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.bounce,
          },
          random: false,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 50,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: 'triangle',
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    };
  }

  particlesInit = async (engine: Engine): Promise<void> => {
    await loadFull(engine);
  };
}

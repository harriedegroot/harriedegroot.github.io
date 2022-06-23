import { Component, Input, OnInit } from '@angular/core';
import { Engine, MoveDirection, OutMode, ParticlesOptions } from 'tsparticles-engine';
import { loadFull } from "tsparticles";
import gsap from 'gsap';
import { fadeAnimation } from 'app/helpers/animations';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  animations: [fadeAnimation]
})
export class BackgroundComponent implements OnInit {
  
  id = 'background_particles';
  particlesOptions?: any;

  @Input() public enabled: boolean = true;

  constructor() {}

  ngOnInit(): void {
    gsap.to('.particles-container', {
      opacity: 1,
      duration: 10,
      delay: 8,
      onStart: () => this.start()
    });
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
  }
}

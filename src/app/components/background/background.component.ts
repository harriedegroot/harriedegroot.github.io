import { Component, OnInit } from '@angular/core';
import { Engine, MoveDirection, OutMode } from 'tsparticles-engine';
import { loadFull } from "tsparticles";
import gsap from 'gsap';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit {
  
  id = 'background_particles';
  
  particlesOptions = {
    background: {
      color: {
        value: 'white',
      },
    },
    fpsLimit: 120,
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
        enable: true,
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
        value: 80,
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

  constructor() {}

  ngOnInit(): void {
    gsap.to('.particles', {
      opacity: 0.4,
      duration: 10,
      delay: 8
    });
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }
}

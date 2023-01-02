import { Component, OnInit } from '@angular/core';
import { EChartsOption, SeriesOption } from 'echarts';
import { cloneDeep } from 'lodash';

const GAUGE: SeriesOption = {
  type: 'gauge',
  pointer: {
    show: false
  },
  progress: {
    show: true,
    width: 20,
    itemStyle: {
      color: 'white'
      //color: '#c2185b',
    }
  },
  axisLine: {
    show: true,
    lineStyle: {
      width: 20,
      opacity: .1
    }
  },
  axisTick: {
    show: false
  },
  splitLine: {
    show: false,
    length: 15,
    lineStyle: {
      width: 2,
      color: '#999'
    }
  },
  axisLabel: {
    show: false,
    // distance: 25,
    // color: '#999',
    // fontSize: 20
  },
  // anchor: {
  //   show: true,
  //   showAbove: true,
  //   size: 25,
  //   itemStyle: {
  //     borderWidth: 10
  //   }
  // },
  title: {
    show: true,
    color: 'white',
    //color: '#c2185b',
    //offsetCenter: [0, '70%'],
    offsetCenter: ['0%', '0%'],
    fontSize: '24'
  },
  detail: {
    show: false,
    valueAnimation: false,
    fontSize: 50,
    fontWeight: 100,
    offsetCenter: ['0%', '0%'],
    //offsetCenter: [0, '70%']
  },
  data: [{
    name: 'A.I.',
    value: 80,
  },]
}

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.scss']
})
export class SpecialitiesComponent implements OnInit {

  public specialties = [
    {
      name: 'A.I.',
      value: 75,
    },
    {
      name: 'C# .NET',
      value: 100,
    },
    {
      name: 'Typescript',
      value: 100,
    },
    {
      name: 'Angular',
      value: 100,
    },
    {
      name: 'NodeJS',
      value: 80,
    },
    {
      name: 'Azure',
      value: 55,
    },
    // {
    //   name: 'Architecture',
    //   value: 85,
    // },
    // {
    //   name: 'EF Core',
    //   value: 90,
    // },
    // {
    //   name: 'SQL',
    //   value: 30,
    // }
  ]

  constructor() { }

  ngOnInit(): void {
  }


  getGaugeOptions(specialty: any): EChartsOption {
    const serie = cloneDeep(GAUGE);
    serie.data = [specialty];
    return { series: [serie]};
  }
}

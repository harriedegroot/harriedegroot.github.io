import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import { getMonthDifference, timespan, toDate } from 'app/helpers/date';
import { wait } from 'app/helpers/wait';
import { Experience, Skill, TimeSpan } from 'app/models/profile.model';
import { ECharts, EChartsOption } from 'echarts';
import { flatMap, flatten, isNil, max, maxBy, min, orderBy, uniq } from 'lodash';
import * as moment from 'moment';
import { fromEvent, Subject, takeUntil } from 'rxjs';

interface SkillPoint {
  timespan: TimeSpan;
  skill: Skill;
  months: number;
}

interface SkillDataPoint {
  date: Date;
  name: string;
  value: number;
  skill: Skill;
}
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  public chartOption?: EChartsOption;
  public chart?: ECharts;
  public tags?: string[];
  public currentStep!: number;

  private _source = new Map<number, SkillDataPoint[]>();
  private _dateMapping = new Map<number, Date>();
  private _redraw: boolean = false;
  private _playing: boolean = false;
  private _onInit: boolean = false;
  private _destroyed: boolean = false;
  private readonly destroyed$ = new Subject<void>();

  @Output('progress') public readonly progressEmitter = new EventEmitter<number>(); 

  @Input() public autoPlay: boolean = false;
  @Input() public increaseSpeed: number = 5; // % per month
  @Input() public decreaseSpeed: number = 3; // % per month
  @Input() public minProficiensy: number = 1;
  @Input() public updateFrequency = 1000; // bar animation speed
  @Input() public stepWait = 200; // waiting time between each step (ms)
  @Input() public maxRows = 50; // max visible rows
  @Input() public monthsToKeepZeroSkills = 12;
  @Input() public firstStep = 0; // NOTE: datapoint 0 has no data
  @Input() public hiddenTags: string[] = [];
  @Input('scrollwheel') public scrollwheelEnabled: boolean = true;
  @Input() public invertScroll: boolean = true;
  @Input() public tagsExpanded: boolean = false;

  public get playing(): boolean {
    return this._playing;
  }

  public get count(): number {
    return (this._source?.size ?? 0) - 1;
  }

  public get progress(): number {
    return this.currentStep  / (this.count - this.firstStep) * 100;
  }

  private _experience!: Experience[];
  public get experience(): Experience[] {
    return this._experience;
  }
  @Input() public set experience(value: Experience[]) {
    this._experience = value;
    this._initialize();
  }

  private _selectedTags: Set<string> = new Set<string>();
  public get selectedTags(): string[] {
    return Array.from(this._selectedTags);
  }
  @Input() public set selectedTags(value: string[]) {
    this._selectedTags = new Set(value);
    this._update();
  }

  //@HostListener("wheel", ["$event"])
  public onScroll(event: WheelEvent) {
    if(!this.scrollwheelEnabled) return;
    let d = Math.abs(event.deltaX) > 1 ? event.deltaX : event.deltaY;
    if(this.invertScroll) {
      d *= -1;
    }

    if(d < 0) {
      this.next();
    } else {
      this.previous();
    }
  }

  @HostListener('window:keyup.space', ['$event'])
  spacceKeyEvent(event: KeyboardEvent) {
    this.toggle();
  }
  @HostListener('window:keyup.ArrowLeft', ['$event'])
  leftKeyEvent(event: KeyboardEvent) {
    this.previous();
  }
  @HostListener('window:keyup.ArrowRight', ['$event'])
  rightKeyEvent(event: KeyboardEvent) {
    this.next();
  }
  @HostListener('window:keyup.ArrowUp', ['$event'])
  upKeyEvent(event: KeyboardEvent) {
    this.rewind(false);
  }
  @HostListener('window:keyup.ArrowDown', ['$event'])
  downKeyEvent(event: KeyboardEvent) {
    this.forward();
  }


  hasMoreTags: boolean = false;

  private _tagsContainerEl?: ElementRef | undefined;
  public get tagsContainerEl(): ElementRef | undefined {
    return this._tagsContainerEl;
  }
  @ViewChild('tagsContainerEl')
  public set tagsContainerEl(value: ElementRef | undefined) {
    if(this._tagsContainerEl != value) {
      this._tagsContainerEl = value;
      this._detectMoreTags();
    }
  }

  get showMore(): boolean {
    //if (this.tagsExpanded) return false;
    return this.hasMoreTags;
  }

  constructor(private cdRef:ChangeDetectorRef, private zone: NgZone) {}

  ngOnInit() {
    this._onInit = true;
    this.currentStep = this.firstStep;

    if(this.scrollwheelEnabled) {
      fromEvent(window, "wheel")
        .pipe(takeUntil(this.destroyed$))
        .subscribe((event) => this.onScroll(event as WheelEvent))
    }
  }

  ngAfterViewInit() {
    if(this.autoPlay) {
      this._initialize();
      this.play();
    }
  }

  
  public async onChartInit(chart: ECharts) {
    this.chart = chart;
  }

  private _initialized = false;
  private _initialize() {
    if (!this._onInit || !this.experience?.length) return;
    if(this._initialized) return;
    this._initialized = true;

    this.zone.runOutsideAngular(() => {
      this._initSource();
      this._initChart();
      this._detectMoreTags();
    })
  }

  private _detectMoreTags() {
    setTimeout(() => {
      const el = this.tagsContainerEl?.nativeElement;
      this.hasMoreTags = el?.scrollHeight > 112;
      this.cdRef.detectChanges();
    });
  }

  private _initSource(): void {
    const skills: SkillPoint[] = flatten(
      this._experience?.map((e) =>
        flatMap(
          e.projects
            ?.filter((p) => p.timespan && p.technologies?.length)
            ?.map((p) => { p.timespan = timespan(p.timespan); return p; })
            ?.map((p) =>
              p.technologies?.map((t) => ({
                timespan: p.timespan,
                skill: t,
                months: getMonthDifference(p.timespan?.from, p.timespan?.to),
              }))
            )
        )
      )
    ).filter((x) => x !== undefined) as any;

    const filtered = skills.map((s) => s.skill.tags).filter((x) => x);
    let tags = orderBy(uniq(flatten(filtered)), i => i?.toLowerCase()) as string[];
    if (this.hiddenTags) {
      tags = tags.filter((x) => !this.hiddenTags.includes(x));
    }

    this.tags = [
      ...tags.filter(t => this.isTagSelected(t)),
      ...tags.filter(t => !this.isTagSelected(t)),
    ]

    let startDate = min(skills.map((s) => s.timespan.from));
    let endDate = max(skills.map((s) => s.timespan.to));

    if (!startDate || !endDate) return;

    let month = toDate(startDate).getMonth();
    let key = 0;

    const points = new Map<string, SkillDataPoint>();

    let final: SkillPoint[] = [];
    const finalYear = toDate(endDate)?.getFullYear();
    for (let year = toDate(startDate).getFullYear(); year <= finalYear; year++) {
      const maxMonth = year === finalYear ? toDate(endDate).getMonth() : 11;
      while (month <= maxMonth) {
        const date = new Date(year, month);
        const selection = skills.filter(
          (s) => s.timespan.to >= date && s.timespan.from <= date
        );
        if (selection?.length) {
          final = selection;
          // decay
          for (let [name, point] of points) {
            if (!selection.some((p) => p.skill.name === name)) {
              const max =
                point.skill.proficiency ??
                point.skill.min ??
                this.minProficiensy;
              const speed = 1 - 0.01 * max + 0.5; // (inverse 0.5 - 1.5 range)
              const value = Math.max(
                point.skill.min ?? this.minProficiensy,
                point.value - this.decreaseSpeed
              );
              points.set(name, { ...point, value });
            }
          }

          for (let { skill, timespan } of selection) {
            const current = points.get(skill.name);
            const max = skill.proficiency ?? skill.min ?? this.minProficiensy;
            const total = getMonthDifference(timespan.from, timespan.to);
            const progress = getMonthDifference(timespan.from, date);
            const minValue = (progress / total) * max;
            const speed = 0.01 * max + 0.5; // (0.5 - 1.5 range)

            if (current) {
              let value = Math.max(
                minValue,
                current.value + speed * this.increaseSpeed
              );
              value = Math.min(
                max,
                Math.max(skill.min ?? this.minProficiensy, value)
              );
              points.set(skill.name, { ...current, value, date, skill });
            } else {
              const final =
                year === moment(timespan.to).toDate().getFullYear() &&
                month === moment(timespan.to).toDate().getMonth();
              const value = final ? max : 0;
              points.set(skill.name, { date, name: skill.name, value, skill });
            }
          }

          const data = Array.from(points.values());
          this._dateMapping.set(key, date);
          this._source.set(key++, data);
        }

        month++;
      }
      month = 0;
    }
  }

  private _initChart() {
    const source = this._source.get(this.firstStep) ?? [];
    this.chartOption = {
      grid: {
        top: 0,
        bottom: 0,
        left: 210,
        right: 20,
      },
      xAxis: {
        max: 100,
        //max: 'dataMax',
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'category',
        inverse: true,
        max: 0,
        animationDuration: 300,
        animationDurationUpdate: 300,
      },
      series: [
        {
          realtimeSort: true,
          seriesLayoutBy: 'column',
          type: 'bar',
        },
      ],
      // Disable init animation.
      animationDuration: 0,
      animationDurationUpdate: this.updateFrequency,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear',
    };
  }

  private _filter(data: SkillDataPoint[], date?: Date): SkillDataPoint[] {
    if (this._selectedTags.size) {
      data = data.filter((p) =>
        p.skill.tags?.some((tag) => this._selectedTags.has(tag))
      );
    }

    date = date ?? maxBy(data, 'date')?.date;
    return data.filter(
      (d) =>
        d.value > 0 ||
        getMonthDifference(d.date, date) <= this.monthsToKeepZeroSkills
    );
  }

  private async _animate() {
    while (!this.chart && !this._destroyed) {
      await wait(100);
    }
    for (let [key, data] of this._source) {
      if (this._destroyed) return;
      if (!this._playing) break;
      if (key < this.currentStep) continue;
      this.currentStep = key;
      this._update(data);
      await wait(this.stepWait);
    }
    this._playing = false;
    this._detectMoreTags();
    this.cdRef.detectChanges();
  }

  private _update(data?: SkillDataPoint[], updateFrequency?: number) {
    if (!this.chart || !this._onInit) return;

    updateFrequency = updateFrequency ?? this.updateFrequency;
    const date = this._dateMapping.get(this.currentStep) ?? new Date();
    data = data ?? this._source.get(this.currentStep);
    if (!data?.length) return;

    const filtered = this._filter(data, date);
    const option = {
      dataset: {
        dimensions: ['name', 'value'],
        source: filtered,
      },
      series: [
        {
          realtimeSort: true,
          seriesLayoutBy: 'column',
          type: 'bar',
          itemStyle: {
            color: 'white',
            opacity: 0.9,
          },
        },
      ],
      yAxis: {
        type: 'category',
        inverse: true,
        max: Math.min(this.maxRows, filtered.length - 1),
        axisLabel: {
          show: true,
          //fontSize: 14
        },
        animationDuration: 300,
        animationDurationUpdate: 300,
      },
      graphic: {
        elements: [
          {
            type: 'text',
            right: 20,
            bottom: 0,
            style: {
              text: moment(date).format('MMMM YYYY'),              
              font: 'bolder 3vw sans-serif', 
              fill: 'rgba(100, 100, 100, 0.75)',
            },
            z: 100,
          },
        ],
      },
      animationDurationUpdate: updateFrequency,
    };
    const replaceMerge = this._redraw ? ['yAxis'] : undefined;
    this._redraw = false;
    this.chart?.setOption(option, { lazyUpdate: true, replaceMerge });

    this.progressEmitter.emit(this.progress);
    //this.cdRef.detectChanges();
  }

  public isTagSelected(tag: string): boolean {
    return this._selectedTags.has(tag);
  }

  public toggleTag(tag: string) {
    if (this._selectedTags.has(tag)) {
      this._selectedTags.delete(tag);
    } else {
      this._selectedTags.add(tag);
    }
    this._redraw = true;
    this._update();
  }

  public play() {
    if (this._playing) return;
    if (this.currentStep === this.count) {
      this._redraw = true;
      this.currentStep = this.firstStep;
    }
    this._playing = true;
    this.cdRef.detectChanges();
    this._animate();
  }

  public pause() {
    if (!this._playing) return;
    this._playing = false;
    this.cdRef.detectChanges();
    this._update(undefined, 250);
  }

  public toggle() {
    if (this.playing) {
      this.pause();
    } else {
      this.play();
    }
  }

  public previous(pause: boolean = true) {
    if(this.currentStep === this.firstStep) return;
    if (pause) {
      this.pause();
    }
    this._redraw = true;
    this.currentStep = Math.max(this.firstStep, this.currentStep - 1);
    this._update();
  }

  public next(pause: boolean = true) {
    if(this.currentStep === this.count) return;
    if (pause) {
      this.pause();
    }
    this.currentStep = Math.min(this.count, this.currentStep + 1);
    this._update();
  }

  public rewind(play: boolean = true) {
    this._redraw = true;
    this.currentStep = this.firstStep;
    if (play) {
      this.play();
    }
  }

  public forward() {
    this._playing = false;
    this.currentStep = this.count;
    this._update();
  }

  public skip() {
    if (this.currentStep === this.count) {
      this.rewind();
    } else {
      this.forward();
    }
  }

  public onSliderChange(value?: number | null) {
    if (isNil(value)) return;

    this.pause();
    this._redraw = value < this.currentStep;
    this.currentStep = value;
    this._update(undefined, 250);
  }

  ngOnDestroy(): void {
    this._destroyed = true;
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

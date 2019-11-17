import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Event } from '../models/event.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() events: Event[] = [];
  lineChartData: ChartDataSets[];
  lineChartOptions: ChartOptions = {
    scales: {
      xAxes: [{
          type: 'time',
          distribution: 'series'
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  // lineChartData: ChartDataSets[] = [
  //   {
  //     data: [
  //       {
  //           x: new Date(),
  //           y: 1
  //       }
  //     ],
  //     label: 'Series A'
  //   },
  //   {
  //     data: [
  //       {
  //         x: new Date(),
  //         y: 2
  //     }

  //     ],
  //     label: 'Series B'
  //   }
  // ];

  constructor() { }

  ngOnInit() {
    this.lineChartData = this.mapEventsToDatasets(this.events);
  }

  mapEventsToDatasets(events: Event[]): ChartDataSets[] {
    return events.reduce((acc, curr) => {
      const highInventoryEvent = {
        x: new Date(curr.time),
        y: curr.potentialHighInv
      };
      const lowInventoryEvent = {
        x: new Date(curr.time),
        y: curr.potentialLowInv
      };

      acc[0].data.push(highInventoryEvent);
      acc[1].data.push(lowInventoryEvent);
      return acc;
    }, [
      {
        data: [],
        label: 'Potential High Inventory'
      },
      {
        data: [],
        label: 'Potential Low Inventory'
      }
    ]);
  }



}

import { Component, OnInit } from "@angular/core";
import * as Chartist from "chartist";
import {
  DashboardService,
  SentimentsChartModel,
  TrendsModel
} from "../services/dashboard-service/dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  positiveData: SentimentsChartModel[];
  negativeData: SentimentsChartModel[];
  trendData: TrendsModel[];

  constructor(private dashborardService: DashboardService) {}
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function(data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    });

    seq2 = 0;
  }
  ngOnInit() {
    this.dashborardService.initPositiveData().subscribe(
      response => {
        this.dashborardService.POSITIVE_DATA = response.body;
        this.dashborardService.initNegativeData().subscribe(
          resp => {
            this.dashborardService.NEGATIVE_DATA = resp.body;
            this.dashborardService.initTrendsData().subscribe((res)=>{
              this.dashborardService.TRENDS_DATA=res.body;

              this.positiveData = this.dashborardService.POSITIVE_DATA;
              this.negativeData = this.dashborardService.NEGATIVE_DATA;
              this.trendData=this.dashborardService.TRENDS_DATA;

              this.drawPositiveSentiments();
              this.drawNegativeSentiments();
              this.drawSentimentTrend();
            },(er)=>{})

            
          },
          err => {}
        );
      },
      error => {}
    );


    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series: [[12, 17, 7, 17, 23, 18, 38]]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    };

    var dailySalesChart = new Chartist.Line(
      "#dailySalesChart",
      dataDailySalesChart,
      optionsDailySalesChart
    );

    this.startAnimationForLineChart(dailySalesChart);

    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ["12p", "3p", "6p", "9p", "12p", "3a", "6a", "9a"],
      series: [[230, 750, 450, 300, 280, 240, 200, 190]]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    };

    var completedTasksChart = new Chartist.Line(
      "#completedTasksChart",
      dataCompletedTasksChart,
      optionsCompletedTasksChart
    );

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ];
    var websiteViewsChart = new Chartist.Bar(
      "#websiteViewsChart",
      datawebsiteViewsChart,
      optionswebsiteViewsChart,
      responsiveOptions
    );

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }
  drawPositiveSentiments=()=>{
    let labels = new Array();
    let series = new Array();

    let maxPositives=series.sort().pop();
    this.positiveData.forEach(record => {
      labels.push(record.Accountname);
      series.push(record.Value);
    });
    
    // this.positiveData.forEach((record)=>{
    //   labels.push(record.Accountname);
    //   series.push(record.Value);
    // })
    var dataPositiveSentiments = {
      labels: labels,
      series: [series]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: maxPositives,
      chartPadding: { top: 0, right: 3, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ];
    var websiteViewsChart = new Chartist.Bar(
      "#positiveChart",
      dataPositiveSentiments,
      optionswebsiteViewsChart,
      responsiveOptions
    );

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }
  drawNegativeSentiments=()=>{
    let labels = new Array();
    let series = new Array();

    let maxNegatives=series.sort().pop();
    this.negativeData.forEach(record => {
      labels.push(record.Accountname);
      series.push(record.Value);
    });

    var dataNegativeSentiments = {
      labels: labels,
      series: [series]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: maxNegatives,
      chartPadding: { top: 0, right: 3, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      [
        "screen and (max-width: 640px)",
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }
      ]
    ];
    var websiteViewsChart = new Chartist.Bar(
      "#negativeChart",
      dataNegativeSentiments,
      optionswebsiteViewsChart,
      responsiveOptions
    );

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }
  drawSentimentTrend(){
    
     /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
     let labels = new Array();
     let series = new Array();
 
     let maxSentiment=series.sort().pop();
     this.trendData.forEach(record => {
       labels.push(record.Month);
       series.push(record.AverageSentiment);
     });
     const dataSentimentTrend: any = {
      labels: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'],
      series: [series]
    };

    const optionsSentimentTrendChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: -1,
      high: 1, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    };

    var sentimentTrendChart = new Chartist.Line(
      "#sentimentTrendChart",
      dataSentimentTrend,
      optionsSentimentTrendChart
    );

    this.startAnimationForLineChart(sentimentTrendChart);
  }
}

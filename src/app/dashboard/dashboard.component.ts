import { Component, OnInit, ViewChild } from "@angular/core";
import * as Chartist from "chartist";
import {
  DashboardService,
  SentimentsChartModel,
  TrendsModel,
  CategoriesModel,
  TweetTrends
} from "../services/dashboard-service/dashboard.service";
import { SelectionModel } from "@angular/cdk/collections";
import { TweetDetails } from "app/models/TweetModel";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  positiveData: SentimentsChartModel[];
  negativeData: SentimentsChartModel[];
  trendData: TrendsModel[];
  tweetTrendData:TweetTrends[];
  categoryData = new Array<CategoriesModel>();
  totalCount = 0;



  displayedColumns: string[] ;
  dataSource ;
  selection = new SelectionModel<TweetDetails>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dashborardService: DashboardService) { }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data) {
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
    chart.on("draw", function (data) {
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
    this.dashborardService.initCategoryData().subscribe(
      response => {
        this.dashborardService.CATEGORY_DATA = response.body;
        this.categoryData = this.dashborardService.CATEGORY_DATA;
        console.log(this.categoryData)
        this.categoryData.forEach(record => {
          this.totalCount = this.totalCount + record.Count;
        })
      },
      error => { }
    );
    this.dashborardService.initPositiveData().subscribe(
      response => {
        this.dashborardService.POSITIVE_DATA = response.body;
        this.dashborardService.initNegativeData().subscribe(
          resp => {
            this.dashborardService.NEGATIVE_DATA = resp.body;
            this.dashborardService.initTrendsData().subscribe(
              res => {
                this.dashborardService.TRENDS_DATA = res.body;

                this.positiveData = this.dashborardService.POSITIVE_DATA;
                this.negativeData = this.dashborardService.NEGATIVE_DATA;
                this.trendData = this.dashborardService.TRENDS_DATA;

                this.drawPositiveSentiments();
                this.drawNegativeSentiments();
                this.drawSentimentTrend();
              },
              er => { }
            );
          },
          err => { }
        );
      },
      error => { }
    );

    this.dashborardService.initTweetsData().subscribe((resp) => {
      console.log(resp.body)
      this.dashborardService.TWEETS_DATA = resp.body;
      this.dataSource = new MatTableDataSource<TweetDetails>(this.dashborardService.TWEETS_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err) => { })

    this.dashborardService.initTweetTrendsData().subscribe((resp) => {
      console.log('HERE.......',resp.body)
      this.dashborardService.TWEET_TRENDS_DATA=resp.body;
      this.tweetTrendData=this.dashborardService.TWEET_TRENDS_DATA;
      this.drawTweterSentimentTrend();
    },(err)=>{})

    this.displayedColumns= ['tweet','retweetcount','classification','sender'];

  }
  drawPositiveSentiments = () => {
    let labels = new Array();
    let series = new Array();

    let maxPositives = series.sort().pop();
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
            labelInterpolationFnc: function (value) {
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
  };
  drawNegativeSentiments = () => {
    let labels = new Array();
    let series = new Array();

    let maxNegatives = series.sort().pop();
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
            labelInterpolationFnc: function (value) {
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
  };
  drawTweterSentimentTrend() {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    let labels = new Array();
    let series = [];
    for(let i=0;i<32;i++){
      series[i]=0;
    }

    

    let maxSentiment = series.sort().pop();
    this.tweetTrendData.forEach(record => {
      labels.push(record.Day);
      console.log(record.Day)
      series[record.Day]=record.AverageSentiment;
    });
    console.log(series)
    const dataSentimentTrend: any = {
      labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
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
      "#twitterSentimentTrendChart",
      dataSentimentTrend,
      optionsSentimentTrendChart
    );

    this.startAnimationForLineChart(sentimentTrendChart);
  }
  drawSentimentTrend() {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    let labels = new Array();
    let series = new Array();

    let maxSentiment = series.sort().pop();
    this.trendData.forEach(record => {
      labels.push(record.Month);
      series.push(record.AverageSentiment);
    });
    const dataSentimentTrend: any = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
      ],
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

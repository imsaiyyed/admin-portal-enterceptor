import {
  Component,
  OnInit,
  SimpleChanges,
  OnChanges,
  ViewChild
} from "@angular/core";
import {
  ChannelConfigurationService,
  Channel,
  ChannelConfiguration
} from "../services/channel-configuration/channel-configuration.service";
import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from "@angular/material";
import { ChangeChannelConfigComponent } from "../change-channel-config/change-channel-config.component";
import { ChangeChannelCredsComponent } from "../change-channel-creds/change-channel-creds.component";

@Component({
  selector: "app-channel-configuration",
  templateUrl: "./channel-configuration.component.html",
  styleUrls: ["./channel-configuration.component.css"]
})
export class ChannelConfigurationComponent implements OnInit {
  channels: Channel[];
  channelId: number;

  displayedColumns: string[];
  dataSource;
  selection = new SelectionModel<Channel>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private channelConfigurationService: ChannelConfigurationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.channelConfigurationService.initChannels().subscribe(resp => {
      this.channelConfigurationService.CHANNEL_DATA = resp.body;
      this.channels = resp.body;
      this.dataSource = new MatTableDataSource<Channel>(
        this.channelConfigurationService.CHANNEL_DATA
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.displayedColumns = ["channelName", "configuration", "credentials"];

    this.channelConfigurationService.initChannelConfigurations().subscribe((resp)=>{
      this.channelConfigurationService.CHANNEL_CONFIGURATION_DATA=resp.body;
    });

    this.channelConfigurationService.initChannelCredentials().subscribe((resp)=>{
      this.channelConfigurationService.CHANNEL_CREDENTIAL_DATA=resp.body;
    });
  }
  changeConfig(channel){
    let dialogRef=this.dialog.open(ChangeChannelConfigComponent, {
      width: '600px',
      data: {Channel:channel}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  changeCreds(channel){
    let dialogRef=this.dialog.open(ChangeChannelCredsComponent, {
      width: '600px',
      data: {Channel:channel}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onChannelChange(newValue) {
    this.channelId = newValue;

    console.log(newValue);
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }
}

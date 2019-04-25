import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AccountDetailsService } from "../services/account-service/account-details.service";
import { ProjectDetailsService } from "../services/project-service/project-details.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import {
  ChannelConfiguration,
  Channel,
  ChannelConfigurationService
} from "../services/channel-configuration/channel-configuration.service";

@Component({
  selector: "app-change-channel-config",
  templateUrl: "./change-channel-config.component.html",
  styleUrls: ["./change-channel-config.component.css"]
})
export class ChangeChannelConfigComponent implements OnInit {
  channelConfigurations = new Array<ChannelConfiguration>();
  channel: Channel;
  newKey: String = "";
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private channelConfigurationService: ChannelConfigurationService,
    public dialogRef: MatDialogRef<ChangeChannelConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    console.log(this.data["Channel"]);
    this.channel = this.data["Channel"];
    if (this.channel) {
      this.channelConfigurationService.CHANNEL_CONFIGURATION_DATA.forEach(
        channelConfig => {
          if (channelConfig.ChannelId == this.channel.Id) {
            this.channelConfigurations.push(channelConfig);
          }
        }
      );
    }
  }

  addKey() {
    if (this.newKey != "") {
      this.channelConfigurationService
        .addNewKey(this.channel.Id, this.newKey)
        .subscribe(
          resp => {
            console.log(resp);
          },
          error => {
            if(error.statusText=='Created'){
              this.channelConfigurations=new Array<ChannelConfiguration>()
    this.channelConfigurationService.initChannelConfigurations().subscribe((resp)=>{
      this.channelConfigurationService.CHANNEL_CONFIGURATION_DATA=resp.body;
      this.channelConfigurationService.CHANNEL_CONFIGURATION_DATA.forEach(
        channelConfig => {
          if (channelConfig.ChannelId == this.channel.Id) {
            this.channelConfigurations.push(channelConfig);
          }
        }
      );
    });
            }
            console.log(error);
          }
        );
    }
  }
  deleteKey(key:ChannelConfiguration){
    this.channelConfigurationService.deleteKey(key).subscribe( resp => {
      console.log(resp);
    },
    error => {
      if(error.statusText=='Created'){
        this.channelConfigurations=new Array<ChannelConfiguration>()
this.channelConfigurationService.initChannelConfigurations().subscribe((resp)=>{
this.channelConfigurationService.CHANNEL_CONFIGURATION_DATA=resp.body;
this.channelConfigurationService.CHANNEL_CONFIGURATION_DATA.forEach(
  channelConfig => {
    if (channelConfig.ChannelId == this.channel.Id) {
      this.channelConfigurations.push(channelConfig);
    }
  }
);
});
      }
      console.log(error);
    });

  }
  closeDialog(){
    this.dialogRef.close();
  }
}

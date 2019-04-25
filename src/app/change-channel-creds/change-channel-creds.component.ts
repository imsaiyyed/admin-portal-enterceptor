import { Component, OnInit, Inject } from '@angular/core';
import { ChannelCredential, Channel, ChannelConfigurationService } from '../services/channel-configuration/channel-configuration.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-change-channel-creds',
  templateUrl: './change-channel-creds.component.html',
  styleUrls: ['./change-channel-creds.component.css']
})
export class ChangeChannelCredsComponent implements OnInit {

  channelCredentials = new Array<ChannelCredential>();
  channel: Channel;
  keyValue:String;
  keyId:number;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private channelConfigurationService: ChannelConfigurationService,
    public dialogRef: MatDialogRef<ChangeChannelCredsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {

    this.channel = this.data["Channel"];
    if (this.channel) {
      this.channelConfigurationService.CHANNEL_CREDENTIAL_DATA.forEach(
        channelCredential => {
          if (channelCredential.ChannelId == this.channel.Id) {
            this.channelCredentials.push(channelCredential);
            console.log(this.channelCredentials);
          }
        }
      );
    }
  }
  onKeyChange(keyId){
    this.keyId=keyId;
    this.channelCredentials.forEach((creds)=>{
      if(creds.KeyId==this.keyId){
        this.keyValue=creds.Value;
      }
    });
    console.log(keyId);

  }
  saveKeyValue(){
    this.channelCredentials.forEach((creds)=>{
      if(creds.KeyId==this.keyId){
        this.channelConfigurationService.saveKeyValue(creds,this.keyValue);
      }
    });
  }
}

import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';


@NgModule({
  imports: [
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    AppModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule { }

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';
import { AppModule } from "./ng/app.module";

var $element: JQuery = $("#ProjectTrackerApp");
var element: Element = $element.get(0);

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
    const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
    upgrade.bootstrap(element, ['ProjectTracker']);
    console.log('hybrid app bootstrapped');
})
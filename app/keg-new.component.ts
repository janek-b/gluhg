import { Component, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Keg } from './keg.model';

declare var jQuery: any;

@Component({
  selector: 'keg-new',
  template: `
    <div class="row">
      <div class="col s12 m6">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Card Title</span>
            <form (ngSubmit)="onSubmit($event, newKeg)" #newKeg="ngForm">
              <div class="row">
                <div class="input-field col s6">
                  <input #newName id="name" type="text">
                  <label for="name">Name</label>
                </div>
                <div class="input-field col s6">
                  <input #newBrewery id="brewery" type="text">
                  <label for="brewery">Brewery</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s4">
                  <select #newStyle>
                    <option *ngFor="let style of styles" [value]="style">{{style}}</option>
                  </select>
                  <label>Style</label>
                </div>
                <div class="input-field col s4">
                  <select #newSize>
                    <option value="124">½ Barrel</option>
                    <option value="105">50 Liter</option>
                    <option value="64">¼ Barrel</option>
                    <option value="41">1/6 Barrel</option>
                  </select>
                  <label>Keg Size</label>
                </div>
                <div class="input-field col s4">
                  <label class="active">Price $ {{newPrice}}</label>
                  <br>
                  <p class="range-field">
                    <input [(ngModel)]="newPrice" type="range" name="price" min="1.0" max="10.0" step="0.25">
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <label class="active">ABV {{newABV}} %</label>
                  <br>
                  <p class="range-field">
                    <input [(ngModel)]="newABV" type="range" name="abv" min="1.0" max="20.0" step="0.1">
                  </p>
                </div>
                <div class="input-field col s6">
                  <label class="active">IBU {{newIBU}}</label>
                  <br>
                  <p class="range-field">
                    <input [(ngModel)]="newIBU" type="range" name="ibu" min="1" max="150" step="1">
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col s12">
                  <button (click)="addKeg(newName.value, newBrewery.value, newStyle.value, newSize.value); newName.value=''; newBrewery.value=''; newStyle.value='';" class="waves-effect waves-light btn col s12" type="submit">Add Keg</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})

export class KegNewComponent {
  @Output() newKegSender = new EventEmitter();
  styles: string[] = ['Lager', 'Pilsner', 'Ale', 'Pale Ale', 'India Pale Ale', 'Stout', 'Porter', 'Wheat Beer', 'Cider', 'Red Ale', 'Imperial IPA', 'Imperial Stout', 'Amber', 'Brown Ale', 'American Adjunct Lager', 'Irish Stout', 'Cascadian Dark Ale', 'Black IPA', 'Session Ale', 'Dunkelweizen', 'Belgian Ale', 'Kölsch', 'Barley wine', 'Bock', 'ESB', 'Schwarzbier', 'Sour Ale', 'Gosé', 'Helles Bock'];
  newPrice: number = 5;
  newABV: number = 5;
  newIBU: number = 20;

  ngAfterViewInit() {
    jQuery('select').material_select();
  }

  onSubmit(event, form) {
    event.preventDefault();
    form.reset();
    return false;
  }

  addKeg(newName: string, newBrewery: string, newStyle: string, newSize: string) {
    var newKeg: Keg = new Keg(newName, newBrewery, this.newPrice, this.newABV, this.newIBU, newStyle, parseInt(newSize), parseInt(newSize));
    this.newKegSender.emit(newKeg);
  }
}
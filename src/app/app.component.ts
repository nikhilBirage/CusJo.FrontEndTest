import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

class Feature {
  id: string;
  colorValue: string = '#000000';
  textFontSize: string = '20';
  fontWeight: string = 'normal';
  fontStyle: string = 'normal';
  textDecoration: string = 'none';
  styles: StyleObject[];
  isVisible: boolean = false;

  constructor(id: string) {
    this.id = id;
    this.styles = [
      {
        isSelected: false,
        type: 'bold',
        value: 'B'
      },
      {
        isSelected: false,
        type: 'italic',
        value: 'I'
      },
      {
        isSelected: false,
        type: 'underline',
        value: 'U'
      }
    ];
  }
}

class StyleObject {
  type: string;
  isSelected: boolean;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-test-question-one';
  currentLang = 'en';
  fonts: { value: string, viewValue: string }[] = [
    { value: '5', viewValue: '5' },
    { value: '10', viewValue: '10' },
    { value: '15', viewValue: '15' },
    { value: '20', viewValue: '20' },
    { value: '25', viewValue: '30' },
    { value: '35', viewValue: '35' },
    { value: '40', viewValue: '40' }
  ];
  languages: { value: string, viewValue: string }[] = [
    { value: 'en', viewValue: 'english' },
    { value: 'cn', viewValue: 'chinese' },
    { value: 'hi', viewValue: 'hindi' }
  ];
  features: Feature[] = [new Feature('one'), new Feature('two'), new Feature('three'), new Feature('four')];

  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang(this.currentLang);
    translateService.use(this.currentLang);
  }

  setClass(style: StyleObject) {
    let style_string = '';
    switch (style.type) {
      case 'bold':
        style_string = 'bold';
        break;
      case 'italic':
        style_string = 'italic';
        break;
      case 'underline':
        style_string = 'underline';
        break;
      default:
        break;
    }
    return style.isSelected ? `${style_string} style-selected` : `${style_string} style-not-selected`;
  }

  onStyleClicked(style: StyleObject, id: string) {
    const feature = this.features.find(x => x.id === id);
    const selectedStyle = feature.styles.find(x => x.type === style.type);
    selectedStyle.isSelected = !style.isSelected;
    switch (style.type) {
      case 'bold':
        feature.fontWeight = selectedStyle.isSelected ? 'bold' : 'normal';
        break;
      case 'italic':
        feature.fontStyle = selectedStyle.isSelected ? 'italic' : 'normal';
        break;
      case 'underline':
        feature.textDecoration = selectedStyle.isSelected ? 'underline' : 'none';
        break;
      default:
        break;
    }
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }

}

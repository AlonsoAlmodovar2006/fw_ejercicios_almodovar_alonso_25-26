import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should keep the title and subTitle unchanged', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    // app.subTitle.set('IES Gregorio Prieto');

    console.log('>>>Privado:', app['title']());
    console.log('>>>Publico:', app.subTitle());
    console.log('>>>Publico:', app.year);
    console.log('>>>Publico:', app.showTitleAndsubTitle());

    expect(app.year).toBe(new Date().getFullYear());
    expect(app['title']()).toBe('mi_app_03');
    expect(app.subTitle()).toBe('DWEC & Frameworks');
  });

  it('should return formatted title, subtitle and year', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    const result = app.showTitleAndsubTitle();

    expect(result).toContain('DWEC & Frameworks');
  });


  it('should render a router-outlet inside section.content', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    console.log('>>>Render:', compiled.innerHTML);

    // router-outlet existe
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();

    // router-outlet está dentro de section.content
    const contentSection = compiled.querySelector('section.content');
    console.log('>>>Render section.content:', contentSection?.innerHTML);
    console.log('>>>Render class section.content:',
      contentSection?.classList.value);

    expect(contentSection).toBeTruthy();
    expect(contentSection?.querySelector('router-outlet')).toBeTruthy();
  });

  it('should increase clicks when buttons are clicked', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button.btn-test');
    expect(buttons).toBeTruthy();

    const button1=buttons[0] as HTMLButtonElement;
    const button2=buttons[1] as HTMLButtonElement;

    button1.click(); //+1
    button1.click(); //+1
    button2.click(); //+2
    button1.click(); //1
    fixture.detectChanges();

    const counter = compiled.querySelector('.click-counter') as HTMLElement;
    expect(counter.textContent).toContain('5');
    expect(app.clicks).toBe(5);
  });
});

// it('should be true', () => {
//   expect(true).toBe(true);
// });

// it('should be 4', () => {
//   expect(2 + 2).toBe(4);
// });

// it('should not divide by 0', () => {
//   let a = 2;
//   let b = 1;
//   let result = a / b;
//   expect(result).not.toBe(Infinity);
// });

// it('should stop test execution when an expect fails', () => {
//   const a = 2;
//   const b = 2;
//   expect(a - b).toBe(0);
//   expect(a + b).toBe(5);
//   expect(true).toBe(true);
// });

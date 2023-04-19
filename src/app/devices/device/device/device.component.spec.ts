import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceComponent } from './device.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

fdescribe('DeviceComponent', () => {
  let component: DeviceComponent;
  let fixture: ComponentFixture<DeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ DeviceComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
    ]
    
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

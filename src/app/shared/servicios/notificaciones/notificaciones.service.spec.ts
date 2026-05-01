import { TestBed } from '@angular/core/testing';
import { NotificationesService } from './notificaciones.service';



describe('NotificacionesService', () => {
  let service: NotificationesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

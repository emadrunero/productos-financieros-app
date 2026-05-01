import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { NotificationesService } from '../../shared/servicios/notificaciones/notificaciones.service';


export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const notification = inject(NotificationesService);

  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {

      let message = 'Error inesperado';

      switch (error.status) {
        case 0:
          message = 'Error de conexión con el servidor';
          break;
        case 400:
          message = 'Datos inválidos';
          break;
        case 404:
          message = 'Recurso no encontrado';
          break;
      }

      notification.showError(message);

      return throwError(() => error);
    })
  );
};

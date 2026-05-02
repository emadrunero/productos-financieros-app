import { inject } from '@angular/core';
;
import { LoggerService } from '../services/logger.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const logger = inject(LoggerService);
  const router = inject(Router);

  // Simulación (cambiar esto luego)
  const isAuthenticated = true;

  logger.log('Intento de acceso a ruta', {
    url: state.url
  });

  if (!isAuthenticated) {
    logger.warn('Acceso denegado', { url: state.url });

    router.navigate(['/login']); // opcional si no tienes login aún
    return false;
  }

  logger.log('Acceso permitido', { url: state.url });
  return true;
};

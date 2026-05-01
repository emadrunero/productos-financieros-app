import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationesService {

  showError(message: string) {
    // puedes cambiar luego por snackbar
    alert(message);
  }
}

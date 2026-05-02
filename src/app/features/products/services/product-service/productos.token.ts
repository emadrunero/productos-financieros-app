import { InjectionToken } from '@angular/core';
import { IProductosService } from '../IProductosService';


export const PRODUCTOS_SERVICE = new InjectionToken<IProductosService>('PRODUCTOS_SERVICE');

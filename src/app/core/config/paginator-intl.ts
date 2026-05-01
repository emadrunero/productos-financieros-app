import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export class CustomPaginatorIntl extends MatPaginatorIntl {

  constructor(private readonly translate: TranslateService) {
    super();
    this.translateLabels();

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });
  }

  translateLabels() {
    this.itemsPerPageLabel = this.translate.instant('table.paginator.items_per_page');
    this.nextPageLabel = this.translate.instant('table.paginator.next_page');
    this.previousPageLabel = this.translate.instant('table.paginator.previous_page');

    this.changes.next();
  }

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return this.translate.instant('table.paginator.range', { start: 0, end: 0, length });
    }

    const start = page * pageSize;
    const end = Math.min(start + pageSize, length);

    return this.translate.instant('table.paginator.range', {
      start: start + 1,
      end,
      length
    });
  };
}

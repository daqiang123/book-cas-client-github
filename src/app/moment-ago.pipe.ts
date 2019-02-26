import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'momentAgo'
})
export class MomentAgoPipe implements PipeTransform {

  transform(value: Date, args?: any): any {
		const oneSecond = 1000;           // 1 sec = 1000 milliseconds
		const oneMinute = 60 * oneSecond; // 1 min = 60 * 1000 milliseconds
		const oneHour   = 60 * oneMinute; // 1 hr = 60 * 60 * 1000 milliseconds
		const oneDay    = 24 * oneHour;   // 1 day = 24 * 60 * 60 * 1000 milliseconds

		var diff = Date.now() - new Date(value).getTime();

		if (diff > oneDay) 
			return this.stringify(diff, oneDay, 'd');
		if (diff > oneHour)
			return this.stringify(diff, oneHour, 'h');
		if (diff > oneMinute)
			return this.stringify(diff, oneMinute, 'm');
		return this.stringify(diff, oneSecond, 's');

	}

	private stringify(timeDiff: number, divisor: number, unit: string) {
		var time = Math.floor(timeDiff/divisor);
		if(time < 0) time = 0;
		return time + unit + ' 前';
	}

}

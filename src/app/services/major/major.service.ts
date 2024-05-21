import { Injectable } from '@angular/core';
import { Major } from '../../models/major';

@Injectable({
  providedIn: 'root'
})
export class MajorService {
  url = 'http://localhost:8080/majors'

  constructor() { }

  async getAllMajors(): Promise<Major[]>{
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  getIdByValue(objectList: Major[], value: string): string {
    return objectList.find(x => x.value === value)?.id ?? '';
  }
}


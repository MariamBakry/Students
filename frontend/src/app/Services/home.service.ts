import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly Base_URL: string;

  constructor(private http: HttpClient,
    private readonly configService: ConfigService) {
      this.Base_URL = this.configService.getBaseUrl('');
    }
}

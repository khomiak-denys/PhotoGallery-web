import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_BASE_PATH } from '../config/api.config';
import { UserProfile } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'photo_gallery_token';
  private readonly profileKey = 'photo_gallery_profile';
  private readonly profileSubject = new BehaviorSubject<UserProfile | null>(this.loadProfile());
  readonly profile$ = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {}

  getToken(): string {
    return this.profileSubject.value?.token ?? localStorage.getItem(this.tokenKey) ?? '';
  }

  isLoggedIn(): boolean {
    return Boolean(this.getToken());
  }

  getProfile(): UserProfile | null {
    return this.profileSubject.value;
  }

  getRole(): string {
    const token = this.getToken();
    if (!token) {
      return '';
    }
    return this.decodeRoleFromToken(token);
  }

  setToken(token: string): void {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  register(payload: { firstName: string; lastName: string; login: string; password: string }): Observable<void> {
    return this.http.post<void>(`${API_BASE_PATH}/auth/register`, payload);
  }

  login(payload: { login: string; password: string }): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${API_BASE_PATH}/auth/login`, payload).pipe(
      tap((response) => {
        this.setToken(response.token);
        this.setProfile(response);
      })
    );
  }

  logout(): void {
    this.setToken('');
    this.setProfile(null);
  }

  private setProfile(profile: UserProfile | null): void {
    if (profile) {
      localStorage.setItem(this.profileKey, JSON.stringify(profile));
    } else {
      localStorage.removeItem(this.profileKey);
    }
    this.profileSubject.next(profile);
  }

  private loadProfile(): UserProfile | null {
    const raw = localStorage.getItem(this.profileKey);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as UserProfile;
    } catch {
      localStorage.removeItem(this.profileKey);
      return null;
    }
  }

  private decodeRoleFromToken(token: string): string {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return '';
    }
    try {
      const payload = this.decodeBase64Url(parts[1]);
      const parsed = JSON.parse(payload) as { role?: string | string[] };
      if (!parsed.role) {
        return '';
      }
      if (Array.isArray(parsed.role)) {
        return parsed.role[0] ?? '';
      }
      return parsed.role;
    } catch {
      return '';
    }
  }

  private decodeBase64Url(input: string): string {
    const normalized = input.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    return atob(padded);
  }
}

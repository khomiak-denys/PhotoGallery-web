import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_PATH } from '../config/api.config';
import { Album, AlbumPhoto, PageQuery, Photo } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAlbums(query: PageQuery): Observable<Album[]> {
    return this.http.get<Album[]>(`${API_BASE_PATH}/albums`, {
      params: this.pageParams(query)
    });
  }

  getMyAlbums(query: PageQuery): Observable<Album[]> {
    return this.http.get<Album[]>(`${API_BASE_PATH}/albums/my`, {
      params: this.pageParams(query)
    });
  }

  getAlbumById(id: string): Observable<Album> {
    return this.http.get<Album>(`${API_BASE_PATH}/albums/${id}`);
  }

  createAlbum(name: string): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(`${API_BASE_PATH}/albums`, { name });
  }

  deleteAlbum(id: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_PATH}/albums/${id}`);
  }

  getAlbumPhotos(id: string, query: PageQuery): Observable<AlbumPhoto[]> {
    return this.http.get<AlbumPhoto[]>(`${API_BASE_PATH}/albums/${id}/photos`, {
      params: this.pageParams(query)
    });
  }

  getPhotos(query: PageQuery): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${API_BASE_PATH}/photos`, {
      params: this.pageParams(query)
    });
  }

  getPhotoById(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${API_BASE_PATH}/photos/${id}`);
  }

  likePhoto(id: string, isPositive: boolean): Observable<void> {
    return this.http.post<void>(`${API_BASE_PATH}/photos/${id}/like`, { isPositive });
  }

  deletePhoto(id: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_PATH}/photos/${id}`);
  }

  private pageParams(query: PageQuery): HttpParams {
    return new HttpParams()
      .set('page', query.page)
      .set('pageSize', query.pageSize);
  }
}

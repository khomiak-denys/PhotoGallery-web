export interface Album {
  id: string;
  name: string;
  coverUrl: string;
}

export interface AlbumPhoto {
  id: string;
  url: string;
  likes: number;
  dislikes: number;
}

export interface Photo {
  id: string;
  url: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  login: string;
  token: string;
}

export interface PageQuery {
  page: number;
  pageSize: number;
}

export interface PhotoUploadResponse {
  photoId: string;
  objectKey: string;
  uploadUrl: string;
}

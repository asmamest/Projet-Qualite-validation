import { jwtDecode } from 'jwt-decode';



export interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
  iat: number;
  [key: string]: any;
}

export class TokenService {
  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);  // Use `jwtDecode` (camelCase)
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  static getRoleFromToken(token: string): string | null {
    const decoded = this.decodeToken(token);
    return decoded?.role || null;
  }
}

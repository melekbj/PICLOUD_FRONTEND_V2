export class User {
  id: number | null = null;
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(id?: number, name?: string, email?: string, password?: string, role?: string) {
    this.id = id || null;
    this.name = name || '';
    this.email = email || '';
    this.password = password || '';
    this.role = role || '';
  }
}
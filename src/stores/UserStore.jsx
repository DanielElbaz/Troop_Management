import { makeAutoObservable, runInAction } from 'mobx';
import { getAllUsers, searchUsers } from '../data/FetchFromUsers';

export class UserStore {
  users = [];
  loading = false;
  error = null;

  query = '';
  unitFilter = null; 
  activeOnly = true;

  constructor() {
    makeAutoObservable(this);
  }

  setQuery(q) { this.query = q; }
  setUnitFilter(id) { this.unitFilter = id; }
  setActiveOnly(b) { this.activeOnly = b; }

  // Client-side filtering (simple & reliable)
  get filtered() {
    return this.users.filter(u => {
      if (this.activeOnly && !u.is_active) return false;
      if (this.unitFilter && u.unit_id !== this.unitFilter) return false;
      const q = this.query.trim().toLowerCase();
      if (!q) return true;
      return (
        (u.first_name || '').toLowerCase().includes(q) ||
        (u.last_name || '').toLowerCase().includes(q) ||
        (u.service_id || '').toLowerCase().includes(q)
      );
    });
  }

  async loadUsers() {
    this.loading = true;
    this.error = null;

    try {
      const data = this.query ? await searchUsers(this.query) : await getAllUsers();
      runInAction(() => {
        this.loading = false;
        this.users = data || [];
      });
    } catch (e) {
      runInAction(() => {
        this.loading = false;
        this.error = e?.message || String(e);
      });
    }
  }
}
const userStore = new UserStore();
userStore.loadUsers();
export { userStore };

import { makeAutoObservable, runInAction } from 'mobx';

export class UserStore {
  users = [];
  loading = false;
  error = null;

  query = '';
  unitFilter = null; 
  activeOnly = true;

  unsub = null;

  constructor() { makeAutoObservable(this); }

  setQuery(q) { this.query = q; }
  setUnitFilter(id) { this.unitFilter = id; }
  setActiveOnly(b) { this.activeOnly = b; }

  // Local filtering (in addition to server-side when USE_MOCK=false)
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

  async fetchUsers() {
    this.loading = true; this.error = null;

    if(this.unitFilter) req = req.eq('unit_id', this.unitFilter);
    if (this.activeOnly) req = req.eq('is_active', true);
    if (this.query) {
      const q = this.query.replace(/%/g, '').trim();
      req = req.or(`first_name.ilike.%${q}%,last_name.ilike.%${q}%,service_id.ilike.%${q}%`);
    }

    const { data, error } = await req.order('last_name', { ascending: true }).order('first_name');
    runInAction(() => {
      this.loading = false;
      this.error = error ? error.message : null;
      this.users = data || [];
    });
  }
}

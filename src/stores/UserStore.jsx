import { makeAutoObservable, runInAction } from "mobx";
import { getAllUsers, searchUsers } from "../data/FetchFromUsers";

export class UserStore {
  users = [];
  loading = false;
  error = null;

  query = "";
  unitFilter = null;
  activeOnly = true;

  constructor() {
    makeAutoObservable(this);
  }

  setQuery(q) {
    this.query = q;
  }
  setUnitFilter(id) {
    this.unitFilter = id;
  }
  setActiveOnly(b) {
    this.activeOnly = b;
  }

  // Client-side filtering (simple & reliable)
  get filtered() {
    return this.users.filter((u) => {
      if (this.activeOnly && !u.is_active) return false;
      if (this.unitFilter && u.unit_id !== this.unitFilter) return false;
      const q = this.query.trim().toLowerCase();
      if (!q) return true;
      return (
        (u.first_name || "").toLowerCase().includes(q) ||
        (u.last_name || "").toLowerCase().includes(q) ||
        (u.service_id || "").toLowerCase().includes(q)
      );
    });
  }

  async loadUsers() {
    this.loading = true;
    this.error = null;

    try {
      const data = this.query
        ? await searchUsers(this.query)
        : await getAllUsers();
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

  // --- Getter helpers (like your friend's getNames) ---
  // Unfiltered versions (use this.filtered instead of this.users if you want filtered lists)

  get getAllUsers() {
    return this.users;
  }
  
  get getServiceIds() {
    return this.users.map((u) => u.service_id);
  }

  get getFirstNames() {
    return this.users.map((u) => u.first_name);
  }

  get getLastNames() {
    return this.users.map((u) => u.last_name);
  }

  get getRoles() {
    return this.users.map((u) => u.role);
  }

  get getPhones() {
    return this.users.map((u) => u.phone);
  }

  get getUnitIds() {
    return this.users.map((u) => u.unit_id);
  }

  // speciality and missions are arrays per user; this returns an array-of-arrays
  get getSpecialities() {
    return this.users.map((u) => u.speciality ?? []);
  }

  get getIsActive() {
    return this.users.map((u) => !!u.is_active);
  }

  get getMissions() {
    return this.users.map((u) => u.missions ?? []);
  }

  // (Optional) convenience: full names & quick lookup map
  get getFullNames() {
    return this.users.map((u) =>
      `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim()
    );
  }

  get byServiceId() {
    return new Map(this.users.map((u) => [u.service_id, u]));
  }
}
const userStore = new UserStore();
userStore.loadUsers();
export { userStore };

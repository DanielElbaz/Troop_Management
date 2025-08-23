import { makeAutoObservable, runInAction } from "mobx";
import { getAllUsers, addUser } from "../data/FetchFromUsers";

export class UserStore {
  users = [];
  error = null;
  currentUserId = null;

  unitFilter = null;
  activeOnly = true;

  constructor() {
    makeAutoObservable(this);
    this.loadUsers();
  }

  async addSoldier(user) {
    runInAction(() => {
      this.error = null;
    });
    try {
      const savedUser = await addUser(user); // API call
      runInAction(() => {
        this.users.push(savedUser);
      });
      return savedUser;
    } catch (e) {
      runInAction(() => {
        this.error = e?.message || String(e);
      });
      throw e;
    }
  }
  async loadUsers() {
    this.error = null;
    try {
      const data = await getAllUsers();
      runInAction(() => {
        this.users = data || [];
      });
    } catch (e) {
      runInAction(() => {
        this.error = e?.message || String(e);
      });
    }
  }
  // Save users to localStorage (or any other storage)
  filterById(id) {
    return this.users.filter((user) => user.service_id === id); 
  }
    getAllUnactiveUser() {
    return this.users.filter((user) => !user.is_active); 
  }
   findUserById(id) {
    return this.users.find((user) => user.service_id === id); 
  }
  // Returns the role of the user with the given service_id, or null if not found
  roleById(id) {
    const user = this.users.find((user) => user.service_id === id);
    return user ? user.role : null;
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

  // (Optional) convenience: full names & quick lookup map
  get getFullNames() {
    return this.users.map((u) =>
      `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim()
    );
  }

  get byServiceId() {
    return new Map(this.users.map((u) => [u.service_id, u]));
  }

  set SetUser(user) {
    this.saveUsers(user);
  }

  SetCurrentUser(userId) {
    const user = this.findUserById(userId);
    localStorage.setItem("currentUserId", JSON.stringify(user));
    this.currentUserId = user;
  }

  GetCurrentUser() {
    const user =  localStorage.getItem("currentUserId");
    return user ? JSON.parse(user) : null;
  }
  
}
export const userStore = new UserStore();
//userStore.loadUsers(); // Initial load

import { makeAutoObservable, runInAction } from "mobx";
import { getAllUsers,addUser } from "../data/FetchFromUsers";

export class UserStore {
  users = [];
  error = null;


sampleSoldiers = [
  {
    first_name: "יוסי",
    last_name: "מזרחי",
    service_id: "1000001",
    phone: "0521122334",
    unit_id: "פלוגה א",
    role: "חייל",
    speciality: ["נהג", "חובש"],
    is_active: true,
  },
  {
    first_name: "דני",
    last_name: "לוי",
    service_id: "1000002",
    phone: "0522233445",
    unit_id: "פלוגה ב",
    role: "מפקד",
    speciality: ["קלע"],
    is_active: true,
  },
  {
    first_name: "רוני",
    last_name: "ביטון",
    service_id: "1000003",
    phone: "0523344556",
    unit_id: "פלוגה ג",
    role: "חייל",
    speciality: ["נגביסט"],
    is_active: false,
  },
];


  unitFilter = null;
  activeOnly = true;

  constructor() {
    makeAutoObservable(this);
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

  // --- Getter helpers (like your friend's getNames) ---
  // Unfiltered versions (use this.filtered instead of this.users if you want filtered lists)

  get getAllUsers() {
    return this.sampleSoldiers;
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
  set SetUser(user){
    this.saveUsers(user);
  }
}
const userStore = new UserStore();
userStore.loadUsers();
export { userStore };

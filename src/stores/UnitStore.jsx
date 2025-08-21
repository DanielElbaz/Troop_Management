import { makeAutoObservable, runInAction } from 'mobx';
import { fetchUnits } from '../data/FetchFromUnit';

export class UnitStore {
  units = [];
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
  }

  get getNames(){
    return this.units.map(unit => unit.name);
  }

  async loadUnits() {
    this.loading = true;
    this.error = null;

    try {
      const { data, error } = await fetchUnits();
      runInAction(() => {
        this.units = data || [];
        this.error = error ? error.message : null;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.message;
        this.loading = false;
      });
    }
  }

  // Optional: alias for refresh
  fetchUnits() {
    this.loadUnits();
  }
}
const unitStore = new UnitStore();
unitStore.loadUnits();
export { unitStore };
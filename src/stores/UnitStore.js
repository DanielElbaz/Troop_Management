import { makeAutoObservable, runInAction } from 'mobx';
import { supabase } from '../data/supabaseClient';
import { USE_MOCK } from '../data/config';
import { mockFetchUnits } from '../data/mockApi';

export class UnitStore {
    units = [];
    loading = false;
    error = null;
    unsub = null;

    constructor() { makeAutoObservable(this); }

    get byId() { return new Map(this.units.map(u => [u.unit_id, u])); }

    async fetchUnits() {
        this.loading = true; 
        this.error = null;

        if (USE_MOCK) {
            const data = await mockFetchUnits();
            return runInAction(() => { this.loading = false; this.units = data; });
        }

        const { data, error } = await supabase.from('units').select('*').order('name');
        runInAction(() => {
            this.loading = false;
            this.error = error ? error.message : null;
            this.units = data || [];
        });
    }
}

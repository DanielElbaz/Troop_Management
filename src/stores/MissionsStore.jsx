import { makeAutoObservable } from "mobx";
import { fetchAllMissions } from "../data/FetchFromMission";

class MissionsStore{
    constructor() {
        this.missions = [];
        makeAutoObservable(this);
    }

    async loadMissions() {
        const missions = await fetchAllMissions();
        this.missions = missions;
    }

    addMission(mission) {
       this.missions.push(mission);
    }

    getAllMissions() {
        return this.missions;
    }
    
}


const missionsStore = new MissionsStore();
missionsStore.loadMissions();
export { missionsStore };
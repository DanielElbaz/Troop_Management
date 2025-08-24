import { makeAutoObservable } from "mobx";
import { fetchAllMissions, createMissionWithAssignees } from "../data/FetchFromMission";

class MissionsStore{
    constructor() {
        this.missions = [];
        makeAutoObservable(this);
    }

    async loadMissions() {
        const missions = await fetchAllMissions();
        this.missions = missions;
    }

   

    getAllMissions() {
        return this.missions;
    }
    
}


const missionsStore = new MissionsStore();
missionsStore.loadMissions();
export { missionsStore };
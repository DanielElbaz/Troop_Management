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

    async newMission(mission, soldierIds = []) {
    this.error = null;
    await createMissionWithAssignees(mission, soldierIds);
    await this.loadMissions();
  }

    getAllMissions() {
        return this.missions;
    }
    
}


const missionsStore = new MissionsStore();
missionsStore.loadMissions();
export { missionsStore };
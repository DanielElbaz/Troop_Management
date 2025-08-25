import { makeAutoObservable } from "mobx";

import { fetchAllMissions, addMission } from "../data/FetchFromMission";
import { assignUsersToMission } from "../data/UserAndMisson";



class MissionsStore{
    constructor() {
        this.missions = [];
        makeAutoObservable(this);
    }

    async loadMissions() {
        const missions = await fetchAllMissions();
        this.missions = missions;
    }

    generateId(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    async addMission(mission, contactUser) {
        const mission_id = this.generateId();
        mission.id = mission_id;
        console.log(mission); 
        const data = await addMission(mission);
        console.log(data);
        contactUser.forEach(async userId => {
            const result = await assignUsersToMission(mission_id, userId);
            console.log(result);
        });
        this.missions.push(mission);
    }


    getAllMissions() {
        return this.missions;
    }
    
}


const missionsStore = new MissionsStore();
missionsStore.loadMissions();
export { missionsStore };
import { formatStandard } from "./formatters.js";

export const parseLocationData = (encountersData) => {
    const locationDataByVersion = {};
    encountersData.forEach(encounter => {
        const locationName = formatStandard(encounter.location_area.name);
        encounter.version_details.forEach(vDetail => {
            const versionName = formatStandard(vDetail.version.name);
            if (!locationDataByVersion[versionName]) locationDataByVersion[versionName] = [];
            
            vDetail.encounter_details.forEach(eDetail => {
                const entry = {
                    location: locationName,
                    method: formatStandard(eDetail.method.name),
                    chance: eDetail.chance,
                    minLevel: eDetail.min_level,
                    maxLevel: eDetail.max_level
                };
                
                const isDuplicate = locationDataByVersion[versionName].some(old => 
                    old.location === entry.location && 
                    old.method === entry.method && 
                    old.minLevel === entry.minLevel
                );

                if (!isDuplicate) {
                    locationDataByVersion[versionName].push(entry);
                }
            });
        });
    });
    return locationDataByVersion;
};
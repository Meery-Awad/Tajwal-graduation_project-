import { GoToMap,GoToInfoOfLoc } from "./types";
// step 2
export const goToMap = () => {
    const action = {
        type: GoToMap,
     
    }
   
    return action
}
export const goToInfoOfLoc = () => {
    const action = {
        type: GoToInfoOfLoc
     
    }
    
    return action
}

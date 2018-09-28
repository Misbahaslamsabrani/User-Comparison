import {githubUrl} from './url'
export const getData = (username) => {
    return new Promise ((resolve, reject) => {
        fetch(githubUrl + username)
        .then((response) => {
            if(response.status === 200){
            return response.json();
            }
            else{
                throw response;}
        
        })
        .then((response) => {
            
            resolve(response)
        })
        .catch((error) => {
            reject(error)
        })
    })
}
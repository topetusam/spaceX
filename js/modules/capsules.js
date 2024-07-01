export const getAllCapsules = async (page,limit)=>{
    let config = {
        headers:{
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            "options": {
                page,
                limit
            }
        })
    }
    let res = await fetch("https://api.spacexdata.com/v4/capsules/query", config)
    let data = await res.json();
    console.log(data);
    return data;
}

// modules/capsules.js

export const getCapsuleById = async (id) => {
    let res = await fetch(`https://api.spacexdata.com/v4/capsules/${id}`);
    let data = await res.json();
    return data;
};

// Otras funciones para obtener información específica de las cápsulas, por ejemplo:

export const getCapsuleDetails = async (id) => {
    let res = await fetch(`https://api.spacexdata.com/v4/capsules/${id}/details`);
    let data = await res.json();
    return data;
};

export const getCapsuleMissions = async (id) => {
    let res = await fetch(`https://api.spacexdata.com/v4/capsules/${id}/missions`);
    let data = await res.json();
    return data;
};

// Puedes añadir más funciones según las necesidades de tu proyecto

export const queryCapsules = async (options) => {
    let config = {
        headers: {
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            options: options
        })
    };

    let res = await fetch("https://api.spacexdata.com/v4/capsules/query", config);
    let data = await res.json();
    return data;
};
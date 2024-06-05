

export async function apiUsersLogin(form) {
    try {
        const response = await $fetch.raw('/api/Users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form.value)
        })
        return response.status
    }

    catch (error) {
        return error.response.status
    }
}

export async function apiUsersRegister(form) {
    try {
        const response = await $fetch.raw('/api/Users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form.value)
        })
        return response.status
    }
    catch (error) {
        return error.response.status
    }

}

export async function apiLobbiesCreate() {
    let res = {
        ID: '',
        status: false
    }
    try {
        const response = await $fetch.raw('/api/Lobbies/create', {
            method: 'POST'
        })
        res.ID = response._data
        res.status = true
    }
    catch (error) {
        res.status = false
    }
    return res
}

export async function apiLobbiesConnect(ID) {
    try {
        const response = await $fetch.raw('/api/Lobbies/connect/' + ID, {
            method: 'POST'
        })
        return response.status
    }
    catch (error) {
        return error.response.status
    }
}

export async function apiUsersGetUser() {
    let res = {
        username: '',
        auth: false,
        InCurrentMatch: false,
        matchId: '',
        isError: false,
        ID: ''
    }
    try {
        const response = await $fetch.raw('/api/Users', { method: 'GET' })
        if (response.status == 200) {
            res.username = response._data.name
            res.InCurrentMatch = response._data.matchInProgress
            res.auth = true
            res.ID = response._data.id
            res.matchId = response._data.matchInProgressId
        }
    }
    catch (error) {
        res.isError = true
    }
    return res;

}

export async function apiUsersLogout() {
    try {
        await $fetch.raw('/api/Users/logout', {
            method: 'POST'
        })
    }
    catch (error) {

    }
}

export async function apiMatchInfo(id) {
    let res = {
        info: {},
        isError: false
    }
    try {
        const response = await $fetch.raw(`/api/Matches/${id}`, { method: 'GET' })
        if (response.status == 200) {
            res.info = response._data
        }
    }
    catch (error) {
        res.isError = true
    }
    return res;
}

export async function apiMatchesIdKill(MatchID, PlayerID) {
    try {


        const response = await $fetch.raw(`/api/Matches/${MatchID}/Kill`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(PlayerID)
        })
    }
    catch(err) {
        
    }
}

export async function apiMatchesIdGetRoles(MatchID) {
    let res = {
        info: {},
        isError: false
    }
    try {
        const response = await $fetch.raw(`/api/Matches/${MatchID}/roles`, {
            method: 'GET',
        })
        console.log(response._data)
        response._data.forEach(element => {
            res.info[element["playerId"]] = element["roleName"]
        });
    } catch (err) {
        console.error(err)
        res.isError = true
    }
    return res;
}
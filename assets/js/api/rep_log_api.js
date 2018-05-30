function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText)
    error.response = response

    throw error
}

/**
 * Returns a promise where the data is the rep log collection
 *
 * @return {Promise<Response>}
 */
export function getRepLogs() {
    return fetch('/reps', {
        credentials: 'same-origin'
    })
        .then(checkStatus)
        .then(response => {
            return response.json();
        })
        .then(data => data.items);
}

export function deleteRepLog(id) {
    return fetch(`/reps/${id}`, {
        credentials: 'same-origin',
        method: 'DELETE'
    })
        .then(checkStatus);
}

export function createRepLog(repLog) {
    return fetch('/reps', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(repLog),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkStatus)
        .then(response => {
            return response.json();
        });
}
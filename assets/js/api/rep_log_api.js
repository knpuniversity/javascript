/**
 * Returns a promise where the data is the rep log collection
 *
 * @return {Promise<Response>}
 */
export function getRepLogs() {
    return fetch('/reps', {
        credentials: 'same-origin'
    })
        .then(response => {
            return response.json();
        })
        .then(data => data.items);
}

export function deleteRepLog(id) {
    return fetch(`/reps/${id}`, {
        credentials: 'same-origin',
        method: 'DELETE'
    });
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
        .then(response => {
            return response.json();
        });
}
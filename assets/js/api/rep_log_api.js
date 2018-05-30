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

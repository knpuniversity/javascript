/**
 * Returns a promise where the data is the rep log collection
 *
 * @return {Promise<Response>}
 */
export function getRepLogs() {
    return fetch('/reps')
        .then(response => {
            return response.json();
        });
}

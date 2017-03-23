function upper(template, ...expressions) {
    return template.reduce((accumulator, part, i) => {
        return accumulator + (expressions[i - 1].toUpperCase ? expressions[i - 1].toUpperCase() : expressions[i - 1]) + part
    })
}

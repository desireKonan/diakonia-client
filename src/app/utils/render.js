export function truncate(data = "", length = 50, separator = '...') {
    return `${data.slice(0, length)}${separator}`
}

export const renderingColumn = (column, row) =>
    column.render ?
        column.render(row[column.id], row) :
        typeof row[column.id] === 'object' ?
            JSON.stringify(row[column.id]) :
            truncate(row[column.id]);

export const renderingTitle = (info) => typeof info === 'object' ?
    JSON.stringify(info) :
    info;

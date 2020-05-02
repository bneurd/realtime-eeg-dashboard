const COLORS = [
    "#3cb44b",
    "#03cea4",
    "#f07537",
    "#ff6384",
    "#9c51ba",
    "#d4b2d8",
    "#222",
    "#b7c448",
    "#4272bf",
    "#36a2eb",
    "#ffce56",
    "#f7464a",
    "#ffffff",
    "#add8e6",
    "#e5a2c2",
    "#4bc0c0",
]

export const getColor = colorNumber => {
    return COLORS[colorNumber % COLORS.length]
}
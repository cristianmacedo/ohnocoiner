Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

Date.prototype.toSimple = function () {
    var date = new Date(this.valueOf());
    return date.toISOString().split("T")[0];
};

export function splitRange(splitSize, startDate, endDate, rangeBuffer = []) {
    let nextDate = startDate.addDays(splitSize);

    if (nextDate > endDate) nextDate = endDate;

    const simpleStartDate = startDate.toSimple();
    const simpleNextDate = nextDate.toSimple();

    const range = [simpleStartDate, simpleNextDate];
    const newBuffer = [...rangeBuffer, range];

    if (nextDate === endDate) return newBuffer;

    return splitRange(splitSize, nextDate.addDays(1), endDate, newBuffer);
}

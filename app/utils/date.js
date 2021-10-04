function use() {
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  Date.prototype.toSimple = function () {
    var date = new Date(this.valueOf());
    return date.toISOString().split("T")[0];
  };
}

const date = {
  use,
};

export default date;

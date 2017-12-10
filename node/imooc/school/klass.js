var teacher = require("./teacher");
var student = require("./student");
// teacher.add('Scott');

function add(teacherName, students) {
    teacher.add(teacherName);
    students.forEach(function (item, index) {
        student.add(item);
    });
}
exports.add = add;
// module.exports = add;
import request from '../utils/request';

export function getStock(lecturer_id) {
    return request({
        url: `http://tnbapi.dn8188.com/lecturers/east/videos_es?bigVId=41&lecturer_id=${lecturer_id}&per=20&token=1644889903463abf7c002d48257bdb9e13289d20ba53c`,
        method: 'get',
        params: {},
    });
}
export function getCourse(course_id) {
    return request({
        url: `http://tnbapi.dn8188.com/courseSeries/subCourseList_es?bigVId=41&course_id=${course_id}&token=1644889903463abf7c002d48257bdb9e13289d20ba53c`,
        method: 'get',
        params: {},
    });
}
export function getOpinion(course_id) {
    return request({
        url: `http://tnbapi.dn8188.com/lecturers/east/feeds_v3_1?lecturer_id=809&per=10&published_at=&bigVId=41&token=164585137181095ea37ad5bb93835c12d638031bf9f4f`,
        method: 'get',
        params: {},
    });
}

class MeetingRooms {
    // [[0,30],[5,10],[15,20]] → false
    // [[7,10],[2,4]] → true
    execute(intervals) {
        if (intervals.length === 0) return true;

        intervals.sort((a, b) => a[0] - b[0]);

        for (let i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i - 1][1]) {
                return false;
            }
        }

        return true;
    }
}
console.log(new MeetingRooms().execute([[0, 30], [5, 10], [15, 20]]));

class CourseSchedule {
    // numCourses = 2, prerequisites = [[1,0]] → true
    // numCourses = 2, prerequisites = [[1,0],[0,1]] → false
    execute(numCourses, prerequisites) {
        const graph = Array.from({ length: numCourses }, () => []);
        const inDegree = new Array(numCourses).fill(0);

        for (const [course, prereq] of prerequisites) {
            graph[prereq].push(course);
            inDegree[course]++;
        }

        const queue = [];
        for (let i = 0; i < numCourses; i++) {
            if (inDegree[i] === 0) queue.push(i);
        }

        let taken = 0;
        while (queue.length) {
            const node = queue.shift();
            taken++;
            for (const neighbor of graph[node]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) queue.push(neighbor);
            }
        }

        return taken === numCourses;
    }
}

console.log(new CourseSchedule().execute(2, [[1, 0]]));
console.log(new CourseSchedule().execute(2, [[1, 0], [0, 1]]));

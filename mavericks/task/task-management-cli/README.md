Task management CLI

1. Add a task
2. List Tasks
3. Update/Complete Task
4. Filter Tasks
5. Delete Tasks
6. Exit

readline  "node:readline";

src
    cli/taskClI.js
    models/task.js
    services/taskServices.js
    repositories/taskRepositories.js
    index.js
test
    TaskService.test.js

task={
    title,
    description,
    status,
    createdAt,
    completedAt
}
--------------------------------------------
========================================
       MEETING ROOM BOOKING SYSTEM
========================================

1. Add Room
2. List Rooms
3. Book Room
4. List Bookings
5. Cancel Booking
6. Check Availability
7. Exit

Select an option:

//{
    id: 1,
    name: "Conference Room A",
    capacity: 10,
    location: "Floor 2",
    createdAt: new Date()
}

{
    id: 1,
    roomId: 1,
    title: "Sprint Planning",
    organizer: "Ye Linn Oo",
    date: "2026-11-20",
    startTime: "09:00",
    endTime: "10:00",
    status: "CONFIRMED",
    createdAt: new Date()
}
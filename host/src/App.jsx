import { useState } from "react";
import G from "./assets/Gym1.jpg";


function checkTime() {
  const d = new Date();
  const day = d.getDay();      // 0–6
  const time = d.getHours();   // hour

  const names = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];

  return { day, day_name: names[day], time };
}

function checkingTimeId(time) {
  if (time >= 8 && time < 9) return 1;
  if (time >= 9 && time < 10) return 2;
  if (time >= 10 && time < 11) return 3;
  if (time >= 11 && time < 12) return 4;
  if (time >= 12 && time < 13) return 5;
  if (time >= 13 && time < 14) return 6;

  return 1; // fallback
}

function findCors(hour, arr) {
  const index = checkingTimeId(hour);
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].colSpan;
    if (index <= sum) return arr[i].cors;
  }

  return "";
}

function CourseTable() {
  const date = checkTime();

  const timeSlots = ["", "8–9", "9–10", "10–11", "11–12", "12–1", "1–2"];

  const courses = [
    {
      day: "Monday",
      course: [
        { cors: "GET121", colSpan: 2 },
        { cors: "PEE233", colSpan: 3 },
        { cors: "CEE122", colSpan: 1 }
      ]
    },
    {
      day: "Tuesday",
      course: [
        { cors: "", colSpan: 1 },
        { cors: "GET121", colSpan: 1 },
        { cors: "PEE233", colSpan: 1 },
        { cors: "GET121", colSpan: 2 },
        { cors: "GET255", colSpan: 1 }
      ]
    },
    {
      day: "Wednesday",
      course: [
        { cors: "PEE233", colSpan: 1 },
        { cors: "", colSpan: 1 },
        { cors: "PEE133", colSpan: 1 },
        { cors: "", colSpan: 1 },
        { cors: "", colSpan: 1 },
        { cors: "GET255", colSpan: 1 }
      ]
    },
    {
      day: "Thursday",
      course: [
        { cors: "GET121", colSpan: 1 },
        { cors: "PEE233", colSpan: 1 },
        { cors: "CEE122", colSpan: 1 },
        { cors: "", colSpan: 1 },
        { cors: "GET255", colSpan: 1 },
        { cors: "", colSpan: 1 }
      ]
    },
    {
      day: "Friday",
      course: [
        { cors: "GET121", colSpan: 1 },
        { cors: "", colSpan: 1 },
        { cors: "PEE233", colSpan: 1 },
        { cors: "", colSpan: 1 },
        { cors: "GET255", colSpan: 1 },
        { cors: "", colSpan: 1 }
      ]
    }
  ];

  // align JS getDay() with your array (Monday = index 0)
  const todayIndex = date.day - 1;
  const todayCourses = courses[todayIndex]?.course || [];

  const active = findCors(date.time, todayCourses);

  return (
    <div className="w-full  flex justify-center items-center">
      <table className="py-2 px-4">
        <thead>
          <tr className="bg-gray-400">
            {timeSlots.map((t, i) => (
              <th key={i} className="border border-black py-2 px-4">
                {t}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {courses.map((row, i) => (
            <tr key={i}>
              <th className="bg-gray-400 border border-black py-2 px-4">
                {row.day}
              </th>

              {row.course.map((cor, id) => {
                const isActive = active === cor.cors && date.day_name === row.day.toLocaleLowerCase() ;

                return (
                  <td
                    key={id}
                    colSpan={cor.colSpan}
                    className={`text-center border border-black py-2 px-4 cursor-pointer 
                      hover:bg-green-400 hover:scale-110 transition 
                      ${isActive ? "bg-green-400" : ""}`}
                  >
                    {cor.cors}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Profile(){
  return (
    <div className="w-40 h-40 overflow-hidden rounded-full bg-transparent backdrop-blur-2xl  ">
      
    </div>
  )
}


export default function App(){

  return (
    <div>
      <Picture />
      <CourseTable />
    </div>
  )
}
"use client";

import React from "react";

export default function ProjectCard({ project }) {
  // Function to determine icon based on project type
  const getProjectIcon = (scope) => {
    if (scope.includes("Fire")) {
      return (
        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      );
    } else if (scope.includes("Electrical")) {
      return (
        <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7极速赛车开奖直播 结果  today幸运飞行艇官方开奖记录" />
        </svg>
      );
    } else if (scope.includes("Plumbing")) {
      return (
        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="current极速赛车开奖直播 结果  today幸运飞行艇官方开奖记录" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 10C21 4 16 2 12 2C8 2 3 4 3 10C3 15 12 22 12 22C12 22 21 15 21 10Z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-8m-8 0H3m2 0h2M9 7h1m-1 4h1m4-4h1极速赛车开奖直播 结果  today幸运飞行艇官方开奖记录" />
        </svg>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
      <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
        <div className="text-white text-center p-4">
          {getProjectIcon(project.scope_of_work)}
          <h3 className="text-lg font-semibold mt-2">{project.project_name}</h3>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.project_name}</h3>
        
        <div className="text-sm text-gray-600 space-y-2 mb-4">
          <p><span className="font-medium">Client:</span> {project.client_name}</p>
          <p><span className="font-medium">Location:</span> {project.location}</p>
          <p><span className="font-medium">Scope:</span> {project.scope_of_work}</p>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 flex-grow">{project.additional_details}</p>
        
        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">MEP Solutions</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</span>
        </div>
      </div>
    </div>
  );
}
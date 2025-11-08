export const apiEndpoints = [
  {
    category: "System Status",
    endpoints: [
      {
        path: "/api/v1/status",
        method: "GET",
        desc: "Get current system health and service uptime",
        params: [],
        response: `{
  "success": true,
  "sites": [ ... ]
}`,
      },
    ],
  },
  // Add your other sections here (Color Tools, Weather, etc.)
];

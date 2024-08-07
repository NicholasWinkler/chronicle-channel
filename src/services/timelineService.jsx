// timelineService.js
export const getAllTimelines = () => {
    return fetch('http://localhost:3000/timelines?_expand=category')
      .then(response => response.json());
  };
  
  export const getTimelineById = (id) => {
    return fetch(`http://localhost:3000/timelines/${id}?_expand=category`)
      .then(response => response.json());
  };
  
  export const createTimeline = (timeline) => {
    return fetch('http://localhost:3000/timelines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(timeline)
    }).then(response => response.json());
  };
  
  export const deleteTimeline = (id) => {
    return fetch(`http://localhost:3000/timelines/${id}`, {
      method: 'DELETE'
    });
  };
  
  export const updateTimeline = (id, updatedTimeline) => {
    return fetch(`http://localhost:3000/timelines/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTimeline)
    }).then(response => response.json());
  };
  

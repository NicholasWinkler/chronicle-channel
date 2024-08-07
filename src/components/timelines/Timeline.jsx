import { useEffect, useState } from "react"
import { getAllTimelines } from "../../services/timelineService"

export const Timeline = {(timeline)} => {
    const [timelines, setTimelines] = useState()

    return (
        {allTimelines.map(timeline => (
            <section className="timeline" key={timeline.id}>
              <header className="timeline-info">Title: {timeline.title}</header>
              <div className="timeline-info">Category: {timeline.category.name}</div>
              <div className="timeline-info">Description: {timeline.description}</div>
            </section>
          ))}
    )
}


// each timeline needs
// id, userId, title, description, categoryId, createdDate
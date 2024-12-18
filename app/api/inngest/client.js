import { Inngest } from "inngest";

// let eventKey = process.env.NEXT_PUBLIC_TEST_STAGE === "test" ? "": process.env.INNGEST_EVENT_KEY
// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app",    
    eventKey:  process.env.INNGEST_EVENT_KEY
}

);
import { createClient } from "next-sanity";
import { projectId , apiVersion , dataset } from "../env";

export const backentClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn:true,
    token:process.env.SANITY_API_TOKEN
}) 

// Purpose:
// Handles server-side operations
// Manages data fetching and mutations
// Provides authenticated access to your content
// Used for CRUD operations